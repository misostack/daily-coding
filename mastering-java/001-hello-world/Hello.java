
public class Hello {
    public static void dataType() {
        // Primitive data types
        int numberOfDaysOf = 20; // Integer: byte, short, int, long
        byte numberOfDaysInWeek = 7; // Byte
        float pi = 3.14f; // Double, Float
        double price = 19.99; // Double
        char grade = 'Ă'; // Character : Unicode character(2bytes)
        boolean isHolidays = true; // Boolean
        System.out.println("Number of days in week: " + numberOfDaysInWeek);
        System.out.println("Pi: " + pi);
        System.out.println("Price: " + price);
        System.out.println("Grade: " + grade);
        System.out.println("Is holidays: " + isHolidays);
        System.out.println("Number of days of: " + numberOfDaysOf);
        System.out.println("Grade: " + grade);
        char startChar = 'a';
        char endChar = 'z';
        for (char c = startChar; c <= endChar; c++) {
            System.out.print(c + " ");
        }
        System.out.println("");
        // casting
        int daysPerWeek = (int) numberOfDaysInWeek; // Implicit casting (widening)
        System.out.println("Days per week: " + daysPerWeek);
        // float
        float examScore = 8.9f;
        int roundedScore = (int) examScore; // Explicit casting (narrowing)
        System.out.println("Rounded score: " + roundedScore);
        // int to byte
        int largeNumber = 257;
        byte smallNumber = (byte) largeNumber; // Explicit casting (narrowing)
        System.out.println("Small number (after casting): " + smallNumber);

        int x = 8;
        if (x > 5) {
            System.out.println("x is greater than 5");
        } else {
            System.out.println("x is less than or equal to 5");
        }
    }
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        dataType();
    }
}