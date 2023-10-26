#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int main(){

int opcent=0;
int opcsal=0;
int continuar=0;
int UnidadEntrada=0;
double UnidadSalida=0;
do{
  printf("El programa permite convertir unidades de potencia utilizadas en radiofrecuencia (milliwatts, Watts, Volts, millivolts, dbm, dbw)\n");
  printf("Opcion 1: Ingresar cantidad de Watts\n");
  printf("Opcion 2: Ingresar cantidad de Volts\n");
  printf("Opcion 3: Ingresar cantidad de miliwatts\n");
  printf("Opcion 4: Ingresar cantidad de milivolts\n");
  printf("Opcion 5: Ingresar cantidad en dBw\n");
  printf("Opcion 6: Ingresar cantidad en dBm\n");
  printf("ingrese una opcion:\n");

  scanf("%d",&opcent);

  printf("Ingrese a que unidad desea convertir:\n");
  printf("Opcion 1: convertir cantidad a Watts\n");
  printf("Opcion 2: convertir cantidad a Volts\n");
  printf("Opcion 3: convertir cantidad a miliwatts\n");
  printf("Opcion 4: convertir cantidad a milivolts\n");
  printf("Opcion 5: convertir cantidad a dBw\n");
  printf("Opcion 6: convertir cantidad a dBm\n");
  printf("ingrese una opcion:\n");

  scanf("%d",&opcsal);
  system("cls");

  printf("Ingrese la cantidad a convertir:");
  scanf("%d",&UnidadEntrada);


  if(opcent == 1 && opcsal ==3 ){
    UnidadSalida = UnidadEntrada*1000;
    printf("Valor en Watts: %d\nValor en miliwatts:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
    if(opcent == 1 && opcsal == 5){
    UnidadSalida = 10*log10(UnidadEntrada);
    printf("Valor en Watts: %d\nValor en dBw:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 1 && opcsal == 6){
    UnidadSalida = 10*log10(UnidadEntrada) + 30;
    printf("Valor en Watts: %d\nValor en dBm:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 2 && opcsal == 4){
    UnidadSalida = UnidadEntrada*1000;
    printf("Valor en Volts: %d\nValor en milivolts:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 3 && opcsal == 1){
    UnidadSalida = UnidadEntrada/1000;
    printf("Valor en miliwatts: %d\nValor en Watts:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 3 && opcsal == 5){
    UnidadSalida = UnidadEntrada/1000;
    UnidadSalida = 10*log10(UnidadSalida);
    printf("Valor en miliwatts: %d\nValor en dBw:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 3 && opcsal == 6){
    UnidadSalida = 10*log10(UnidadSalida);
    printf("Valor en miliwatts: %d\nValor en dBm:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 4 && opcsal == 2){
    UnidadSalida = UnidadEntrada/1000;
    printf("Valor en milivolts: %d\nValor en Volts:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 5 && opcsal == 1){
    UnidadSalida = UnidadEntrada/10;
    UnidadSalida = pow(10,UnidadSalida);
    printf("Valor en DBw: %d\nValor en Watts:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 5 && opcsal == 3){
    UnidadSalida = UnidadEntrada/10;
    UnidadSalida = 1000*pow(10,UnidadSalida);
    printf("Valor en DBw: %d\nValor en miliwatts:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 5 && opcsal == 6){
    UnidadSalida = UnidadEntrada +30;
    printf("Valor en DBw: %d\nValor en DBm:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 6 && opcsal == 1){
    UnidadSalida = UnidadEntrada-30;
    UnidadSalida = UnidadSalida/10;
    UnidadSalida = pow(10,UnidadSalida);
    printf("Valor en DBm: %d\nValor en Watts:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 6 && opcsal==3){
    UnidadSalida = UnidadEntrada/10;
    UnidadSalida = pow(10,UnidadSalida);
    printf("Valor en DBm: %d\nValor en miliwatts:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == 6 && opcsal == 5){
    UnidadSalida = UnidadEntrada-30;
    printf("Valor en DBm: %d\nValor en dBw:%lf\n",UnidadEntrada,UnidadSalida);
  }
  else
  if(opcent == opcsal){
    printf("Valor en original: %d\nValor convertido:%lf\n",UnidadEntrada,UnidadEntrada);
  }
  else{
    printf("No se puede, puro pinche Venezuela ALV\n");
  }
  printf("¿Desea continuar?\nOpcion 1: Si\nopcion 2: no\n");
  scanf("%d",&continuar);
}while(continuar!=2);

}
