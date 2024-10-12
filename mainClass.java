import java.util.Arrays;
import java.util.Scanner;
public class mainClass {
    static Scanner input = new Scanner(System.in);

    public static void tamanoArregloInput() {
        System.out.println("Ingresa el tamaño del arreglo: ");
        int tamano = input.nextInt();
        System.out.println("El tamaño del arreglo es: " + tamano);
    }

    public static void ingresarArreglo() {      
        System.out.println("Ingresa el tamaño del arreglo: ");
        int tamano = input.nextInt();
        System.out.println("Ingresa el arreglo: ");
        int[] arreglo = new int[tamano];
        for (int i = 0; i < tamano; i++) {
            arreglo[i] = input.nextInt();
        }

        String matriz = Arrays.toString(arreglo);
        System.out.println("El arreglo es: " + matriz);
    }

    public static void main(String[] args) {
        ingresarArreglo();
    }
}