import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';

import CardService from '../../components/CardService';

import { PaginationSimple } from '../../components/PaginationSimple';
import { Filters } from './Filters';
import { api } from '../../services/api';
import { Block, Text } from 'galio-framework';
import { useFocusEffect } from '@react-navigation/native';

const Services = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [hasClean, setHasClean] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    total: 0,
    lastPage: 0,
  });

  const fetchServices = (params) => {
    setIsLoading(true);

    api
      .request()
      .get('/services', {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        setPagination({
          currentPage: data.currentPage,
          lastPage: data.lastPage,
          total: data.total,
        });
        setServices(data.data);
        setIsLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      setHasClean(!hasClean);
      fetchServices({});
    }, [])
  );

  const handleDelete = (id) => {
    try {
      api
        .request()
        .delete(`/services/${id}`)
        .then(() => {
          setClients(services.filter((item) => item.id !== id));
        });
    } catch (error) {
      console.error('Ocorreu um erro na requisição:', error);
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage === pagination.lastPage) return;

    fetchClients({ page: pagination.currentPage + 1 });
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage === 1) return;

    fetchClients({ page: pagination.currentPage - 1 });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <Filters fetchServices={fetchServices} hasClean={hasClean} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Block>
          {services.length === 0 && (
            <Text center style={{ marginTop: 20, marginBottom: 20 }}>
              {' '}
              Nenhum registro encontrado{' '}
            </Text>
          )}

          {services.map((item) => {
            return (
              <CardService
                navigation={navigation}
                id={item.id}
                nome={item.name}
                valor={item.price}
                handleDelete={handleDelete}
              />
            );
          })}
          <PaginationSimple
            currentPage={pagination.currentPage}
            total={pagination.total}
            lastPage={pagination.lastPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        </Block>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
  },
});

export default Services;
