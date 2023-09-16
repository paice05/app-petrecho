import React, { useCallback, useEffect, useState } from "react";
import { Block, Text } from "galio-framework";
import { addDays, format, setHours, setMinutes, subDays } from "date-fns";
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Tabs from "../../components/Tabs";
import { Modal } from "../../components/Modal";
import { Calendar } from "../../components/Calendar";
import CardSchedule from "../../components/CardSchedule";
import { Navigation } from "../../components/Navigation";
import { ScheduleCard } from "../../components/ScheduleCard/ScheduleCard";
import { nowTheme, tabs } from "../../constants";
import { PaginationSimple } from "../../components/PaginationSimple";
import { useRequestDestroy } from "../../components/hooks/useRequestDestroy";
import { useRequestFindMany } from "../../components/hooks/useRequestFindMany";
import { formartDate } from "../../utils/formartDate";
import { api } from "../../services/api";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useRequestUpdate } from "../../components/hooks/useRequestUpdate";

const ScheduleList = ({ route, navigation }) => {
  const params = route.params;

  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedScheduleAwating, setSelectedScheduleAwating] = useState({
    open: false,
    scheduleId: "",
    hour: "",
  });
  const [schedules, setSchedules] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 0,
    lastPage: 0,
  });

  const {
    execute: findMany,
    response,
    loading,
    error,
  } = useRequestFindMany({
    path: "/schedules",
    defaultQuery: {
      page: pagination.currentPage,
      perPage: 50,
      where: {
        scheduleAt: {
          $between: [
            new Date(
              `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()} 00:00:00`
            ),
            new Date(
              `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()} 23:59:59`
            ),
          ],
        },
      },
      order: [["scheduleAt", "ASC"]],
    },
  });

  const { execute: execUpdate, loading: loadingUpdate } = useRequestUpdate({
    path: "/schedules",
    id: null,
    callbackSuccess: () => {
      findMany();
      handleCloseScheduleAwating();
    },
  });

  const { execute: destroy } = useRequestDestroy({
    path: "/schedules",
    callbackSuccess: findMany,
  });

  useEffect(() => {
    if (error) setSchedules([]);
  }, [error]);

  useEffect(() => {
    if (response) {
      setPagination({
        currentPage: response.currentPage,
        lastPage: response.lastPage,
        total: response.total,
      });
      setSchedules(response.data);
    }
  }, [response]);

  const fetchChangeStatus = (id, payload) => {
    api
      .request()
      .put(`/schedules/${id}/status`, payload)
      .then(() => {
        findMany();
      });
  };

  useFocusEffect(
    useCallback(() => {
      findMany();
    }, [date])
  );

  const handleAwaitingUpdate = () => {
    const [hour, minute] = selectedScheduleAwating.hour.split(":");

    const scheduleAt = setMinutes(setHours(date, Number(hour)), Number(minute));

    const payload = {
      status: "pending",
      scheduleAt,
    };

    execUpdate(payload, {}, selectedScheduleAwating.scheduleId);
  };

  const handleConfirmDelete = (id) =>
    Alert.alert("Cuidado", "você deseja remover esse agendamento?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Confirmar", onPress: () => destroy(id) },
    ]);

  const handleNextPage = () => {
    if (pagination.currentPage === pagination.lastPage) return;

    findMany({ page: pagination.currentPage + 1 });
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage === 1) return;

    findMany({ page: pagination.currentPage - 1 });
  };

  const handleFinished = (scheduleId) => {
    const payload = {
      status: "finished",
    };

    fetchChangeStatus(scheduleId, payload);
  };
  const handleCanceled = (scheduleId) => {
    const payload = {
      status: "canceled",
    };

    fetchChangeStatus(scheduleId, payload);
  };
  const handleRestore = (id) => {
    api
      .request()
      .get(`/schedules/${id}/revert`)
      .then(() => {
        findMany();
      });
  };

  const handleCloseScheduleAwating = () => {
    setSelectedScheduleAwating({
      open: false,
      scheduleId: "",
      hour: "",
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={styles.card}
    >
      <LoadingOverlay visible={loading || loadingUpdate} />

      <TouchableOpacity
        style={styles.dateStyle}
        onPress={() => setOpenCalendar(true)}
      >
        <Text bold colo="#e6e6e6" size={18}>
          {formartDate(date, "dd  MMMM YYY")}
        </Text>
      </TouchableOpacity>

      <Block row center>
        <Tabs
          data={tabs.week}
          selected={tabs.week[date.getDay()].id}
          onChange={(id) => {
            const currentDay = date.getDay();
            const result = currentDay - id;

            if (result > 0) setDate(subDays(date, result));
            if (result < 0) setDate(addDays(date, result * -1));
          }}
          date={date}
        />
      </Block>

      <Navigation
        items={[
          {
            title: "Lista",
            children: (
              <Block style={{ marginVertical: 10 }}>
                {schedules.length === 0 && (
                  <Text
                    size={18}
                    center
                    style={{ marginTop: 20, marginBottom: 20 }}
                  >
                    Nenhum registro encontrado
                  </Text>
                )}

                {schedules
                  .sort((a, b) =>
                    formartDate(a.scheduleAt, "HH:mm") >
                    formartDate(b.scheduleAt, "HH:mm")
                      ? 1
                      : -1
                  )
                  .filter((item) => item.status !== "awaiting")
                  .map((item) => {
                    return (
                      <CardSchedule
                        key={item.id}
                        navigation={navigation}
                        id={item.id}
                        nome={
                          item?.user?.name ||
                          item?.shortName ||
                          "(Esse cliente não existe)"
                        }
                        funcionario={
                          item?.employee?.name ||
                          "(Esse funcionário não existe)"
                        }
                        servico={item?.services
                          ?.filter((item) => !item.ServiceSchedule.isPackage)
                          .map((item) => item.name)
                          .join(", ")}
                        pacote={item?.services
                          ?.filter((item) => item.ServiceSchedule.isPackage)
                          .map((item) => item.name)
                          .join(", ")}
                        horario={formartDate(item.scheduleAt, "HH:mm")}
                        dia={formartDate(item.scheduleAt, "dd/MM/YYY")}
                        status={item.status}
                        onFinished={() => handleFinished(item.id)}
                        onCanceled={() => handleCanceled(item.id)}
                        onDeleted={() => handleConfirmDelete(item.id)}
                        onRevert={() => handleRestore(item.id)}
                      />
                    );
                  })}
              </Block>
            ),
          },
          {
            title: "Horários",
            children: (
              <ScheduleCard
                payload={schedules
                  .filter(
                    (item) =>
                      item.status === "pending" || item.status === "finished"
                  )
                  .map((item) => formartDate(item.scheduleAt, "HH:mm"))}
              />
            ),
          },
          {
            title: "Espera",
            children: (
              <Block style={{ marginVertical: 10 }}>
                {schedules.length === 0 && (
                  <Text
                    size={18}
                    center
                    style={{ marginTop: 20, marginBottom: 20 }}
                  >
                    Nenhum registro encontrado
                  </Text>
                )}
                {schedules
                  .filter((item) => item.status === "awaiting")
                  .map((item) => {
                    return (
                      <CardSchedule
                        key={item.id}
                        navigation={navigation}
                        id={item.id}
                        nome={
                          item?.user?.name ||
                          item?.shortName ||
                          "(Esse cliente não existe)"
                        }
                        funcionario={
                          item?.employee?.name ||
                          "(Esse funcionário não existe)"
                        }
                        servico={item?.services
                          ?.filter((item) => !item.ServiceSchedule.isPackage)
                          .map((item) => item.name)
                          .join(", ")}
                        dia={formartDate(item.scheduleAt, "dd/MM/YYY")}
                        status={item.status}
                        pacote={item?.services
                          ?.filter((item) => item.ServiceSchedule.isPackage)
                          .map((item) => item.name)
                          .join(", ")}
                        onAwaiting={() =>
                          setSelectedScheduleAwating({
                            open: true,
                            scheduleId: item.id,
                            hour: "",
                          })
                        }
                      />
                    );
                  })}
                <Modal
                  title="Selecione um horário disponível"
                  isVisible={selectedScheduleAwating.open}
                  onRequestClose={handleCloseScheduleAwating}
                  handleCancel={handleCloseScheduleAwating}
                >
                  <Block>
                    <ScheduleCard
                      payload={schedules
                        .filter(
                          (item) =>
                            item.status === "pending" ||
                            item.status === "finished"
                        )
                        .map((item) => formartDate(item.scheduleAt, "HH:mm"))}
                      onConfirm={(time) =>
                        setSelectedScheduleAwating({
                          ...selectedScheduleAwating,
                          hour: time,
                        })
                      }
                      selected={selectedScheduleAwating.hour}
                    />

                    <Block row style={styles.wrapperButtons}>
                      <TouchableOpacity
                        onPress={handleAwaitingUpdate}
                        style={[styles.button, styles.primary]}
                      >
                        <Text color="white" bold size={16}>
                          Confirmar
                        </Text>
                      </TouchableOpacity>
                    </Block>
                  </Block>
                </Modal>
              </Block>
            ),
          },
        ]}
      />

      {schedules.length > 0 ? (
        <PaginationSimple
          currentPage={pagination.currentPage}
          total={pagination.total}
          lastPage={pagination.lastPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      ) : null}

      <Modal
        isVisible={openCalendar}
        handleCancel={() => setOpenCalendar(false)}
        handleConfirm={() => setOpenCalendar(false)}
        title="Selecione uma data para buscar seus agendamentos"
        onRequestClose={() => {
          Alert.alert("Modal será fechado.");
          setOpenCalendar(!openCalendar);
        }}
      >
        <Calendar
          onChange={(value) => {
            setDate(new Date(`${value} 00:00:00`));
            setOpenCalendar(false);
          }}
        />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: "#eee",
  },
  dateStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#FFFFFF',
    paddingVertical: 5,
  },
  containerButton: {
    display: "flex",
    flexDirection: "row",
    //padding: 12,
    position: "relative",
  },
  buttonWeek: {
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    gap: 3,
    margin: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    width: "10%",
  },
  text: {
    marginHorizontal: 20,
    fontSize: 12,
  },
  wrapperButtons: {
    justifyContent: "center",
    gap: 15,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    paddingVertical: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
});

export default ScheduleList;
