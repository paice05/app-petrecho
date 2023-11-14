export function adicionarMinutos(horarioOriginal, minutosAdicionais) {
  // Divida a string nos dois pontos para obter horas e minutos
  var partes = horarioOriginal.split(":");
  var horas = parseInt(partes[0], 10);
  var minutos = parseInt(partes[1], 10);

  // Adicione os minutos fornecidos
  minutos = minutos + minutosAdicionais;

  // Certifique-se de ajustar as horas se os minutos ultrapassarem 60
  horas = horas + Math.floor(minutos / 60);
  minutos = minutos % 60;

  // Certifique-se de formatar as horas e os minutos para terem dois dígitos
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;

  // A nova hora formatada
  var novoHorario = horas + ":" + minutos;

  return novoHorario;
}
