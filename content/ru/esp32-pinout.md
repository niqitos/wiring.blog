---
authors:
  - name: Niqitos
    avatar: /images/avatars/niqitos.jpg
tags:
  - Arduino
  - ESP32
title: Распиновка ESP32
description: Чип ESP32 оснащен 48 мульти функциональными контактами. Не все контакты доступны на всех платах разработки ESP32 и некоторые контакты нельзя использовать.
seo:
  title: Распиновка ESP32
  description: Чип ESP32 оснащен 48 мульти функциональными контактами. Не все контакты доступны на всех платах разработки ESP32 и некоторые контакты нельзя использовать.
published: true
date: 2025-09-03T00:00:00.000Z
sitemap: true
---

На рисунке ниже показана распиновка чипа ESP-WROOM-32. Вы можете использовать его в качестве справочного материала, если вы используете голую микросхему ESP32 для сборки собственной платы:

Не все GPIO доступны на всех платах разработки, но каждый конкретный GPIO работает одинаково, независимо от используемой платы разработки. Если вы только начинаете работать с ESP32, рекомендуем прочитать наше руководство: Начало работы с платой разработки ESP32.

## Периферия ESP32

*	18 каналов аналого-цифрового преобразователя (АЦП)
*	3 интерфейса SPI
*	3 интерфейса UART
*	2 интерфейса I2C
*	16 выходных каналов ШИМ
*	2 цифро-аналоговых преобразователя (ЦАП)
*	2 интерфейса I2S
*	10 емкостных датчиков GPIO

Функции АЦП (аналого-цифровой преобразователь) и ЦАП (цифро-аналоговый преобразователь) назначаются определенным статическим контактам. Тем не менее, в коде программы вы можете назначить какие контакты в качестве UART, I2C, SPI, PWM и т. д. Это возможно благодаря функции мультиплексирования чипа ESP32.

Хотя вы можете определять свойства контактов в программном обеспечении, есть контакты, назначенные по умолчанию, как показано на следующем рисунке (это пример платы ESP32 DEVKIT V1 DOIT с 36 контактами - расположение контактов может меняться в зависимости от производителя).

Кроме того, есть контакты с определенными функциями, которые делают их подходящими или не подходящими для конкретного проекта. В следующей таблице показано, какие выводы лучше всего использовать в качестве входов, выходов, а с какими следует быть осторожными.

Контакты, выделенные зеленым цветом, подходят для использования. Те, которые выделены желтым цветом, подходят для использования, но на них стоит обратить внимание, так как они могут иметь неожиданное поведение, в основном при загрузке. Контакты, выделенные красным, не рекомендуется использовать в качестве входов или выходов.

| **GPIO** | **Ввод**                               | **Вывод** | **Особенности**                                                                |
| -------- | -------------------------------------- | --------- | ------------------------------------------------------------------------------ |
| **0**    | подключен через подтягивающий резистор | OK        | выводит ШИМ сигнал при загрузке                                                |
| **1**    | TX пин                                 | OK        | отладочный вывод при загрузке                                                  |
| **2**    | OK                                     | OK        | подключен к встроенному светодиоду, должен оставаться плавающим или находиться в состоянии LOW для перехода в режим мигания |
| **3**    | OK                                     | RX пин    | выводит сигнал высокого уровня при загрузке                                    |
| **4**    | OK                                     | OK        |                                                                                |
| **5**    | OK                                     | OK        | выводит ШИМ сигнал при загрузке.                                               |
| **6**    | x                                      | x         | подключен к встроенной флэш-памяти SPI                                         |
| **7**    | x                                      | x         | подключен к встроенной флэш-памяти SPI                                         |
| **8**    | x                                      | x         | подключен к встроенной флэш-памяти SPI                                         |
| **9**    | x                                      | x         | подключен к встроенной флэш-памяти SPI                                         |
| **10**   | x                                      | x         | подключен к встроенной флэш-памяти SPI                                         |
| **11**   | x                                      | x         | подключен к встроенной флэш-памяти SPI                                         |
| **12**   | OK                                     | OK        | ESP32 не загружается, если вход подтянут к HIGH, связывающий вывод             |
| **13**   | OK                                     | OK        |                                                                                |
| **14**   | OK                                     | OK        | выводит ШИМ сигнал при загрузке                                                |
| **15**   | OK                                     | OK        | выводит ШИМ сигнал при загрузке                                                |
| **16**   | OK                                     | OK        |                                                                                |
| **17**   | OK                                     | OK        |                                                                                |
| **18**   | OK                                     | OK        |                                                                                |
| **19**   | OK                                     | OK        |                                                                                |
| **21**   | OK                                     | OK        |                                                                                |
| **22**   | OK                                     | OK        |                                                                                |
| **23**   | OK                                     | OK        |                                                                                |
| **25**   | OK                                     | OK        |                                                                                |
| **26**   | OK                                     | OK        |                                                                                |
| **27**   | OK                                     | OK        |                                                                                |
| **32**   | OK                                     | OK        |                                                                                |
| **33**   | OK                                     | OK        |                                                                                |
| **34**   | OK                                     |           | только вход                                                                    |
| **35**   | OK                                     |           | только вход                                                                    |
| **36**   | OK                                     |           | только вход                                                                    |
| **39**   | OK                                     |           | только вход                                                                    |

## Пины входа
GPIOs 34–39 являются GPI — то есть работают только в режиме ввода, так как они не оснащены подтягивающим резистором.
-	GPIO 34
-	GPIO 35
-	GPIO 36
-	GPIO 39

## SPI flash на ESP-WROOM-32
GPIO с 6 по 11 имеют выводы на некоторых платах разработки ESP32, но эти выводы подсоединены к встроенному модулю SPI flash на чипе ESP-WROOM-32 и не рекомендуется их использовать в других целях.
-	GPIO 6 (SCK/CLK)
-	GPIO 7 (SDO/SD0)
-	GPIO 8 (SDI/SD1)
-	GPIO 9 (SHD/SD2)
-	GPIO 10 (SWP/SD3)
-	GPIO 11 (CSC/CMD)

## GPIO с поддержкой ёмкостного касания
ESP32 оборудована 10 ёмкостными сенсорами касания. These can sense variations in anything that holds an electrical charge, like the human skin. So they can detect variations induced when touching the GPIOs with a finger. These pins can be easily integrated into capacitive pads, and replace mechanical buttons. The capacitive touch pins can also be used to wake up the ESP32 from deep sleep.
Those internal touch sensors are connected to these GPIOs:
-	T0 (GPIO 4)
-	T1 (GPIO 0)
-	T2 (GPIO 2)
-	T3 (GPIO 15)
-	T4 (GPIO 13)
-	T5 (GPIO 12)
-	T6 (GPIO 14)
-	T7 (GPIO 27)
-	T8 (GPIO 33)
-	T9 (GPIO 32)
Learn how to use the touch pins with Arduino IDE: ESP32 Touch Pins with Arduino IDE

## Analog to Digital Converter (ADC)
The ESP32 has 18 x 12 bits ADC input channels (while the ESP8266 only has 1x 10 bits ADC). These are the GPIOs that can be used as ADC and respective channels:
-	ADC1_CH0 (GPIO 36)
-	ADC1_CH1 (GPIO 37)
-	ADC1_CH2 (GPIO 38)
-	ADC1_CH3 (GPIO 39)
-	ADC1_CH4 (GPIO 32)
-	ADC1_CH5 (GPIO 33)
-	ADC1_CH6 (GPIO 34)
-	ADC1_CH7 (GPIO 35)
-	ADC2_CH0 (GPIO 4)
-	ADC2_CH1 (GPIO 0)
-	ADC2_CH2 (GPIO 2)
-	ADC2_CH3 (GPIO 15)
-	ADC2_CH4 (GPIO 13)
-	ADC2_CH5 (GPIO 12)
-	ADC2_CH6 (GPIO 14)
-	ADC2_CH7 (GPIO 27)
-	ADC2_CH8 (GPIO 25)
-	ADC2_CH9 (GPIO 26)

Learn how to use the ESP32 ADC pins:
-	ESP32 ADC Pins with Arduino IDE
-	ESP32 ADC Pins with MicroPython

Note: ADC2 pins cannot be used when Wi-Fi is used. So, if you’re using Wi-Fi and you’re having trouble getting the value from an ADC2 GPIO, you may consider using an ADC1 GPIO instead, that should solve your problem.

The ADC input channels have a 12 bit resolution. This means that you can get analog readings ranging from 0 to 4095, in which 0 corresponds to 0V and 4095 to 3.3V. You also have the ability to set the resolution of your channels on the code, as well as the ADC range.

The ESP32 ADC pins don’t have a linear behavior. You’ll probably won’t be able to distinguish between 0 and 0.1V, or between 3.2 and 3.3V. You need to keep that in mind when using the ADC pins. You’ll get a behavior similar to the one shown in the following figure.

## Digital to Analog Converter (DAC)
There are 2 x 8 bits DAC channels on the ESP32 to convert digital signals into analog voltage signal outputs. These are the DAC channels:
-	DAC1 (GPIO25)
-	DAC2 (GPIO26)

## RTC GPIOs
There is RTC GPIO support on the ESP32. The GPIOs routed to the RTC low-power subsystem can be used when the ESP32 is in deep sleep. These RTC GPIOs can be used to wake up the ESP32 from deep sleep when the Ultra Low Power (ULP) co-processor is running. The following GPIOs can be used as an external wake up source.

-	RTC_GPIO0 (GPIO36)
-	RTC_GPIO3 (GPIO39)
-	RTC_GPIO4 (GPIO34)
-	RTC_GPIO5 (GPIO35)
-	RTC_GPIO6 (GPIO25)
-	RTC_GPIO7 (GPIO26)
-	RTC_GPIO8 (GPIO33)
-	RTC_GPIO9 (GPIO32)
-	RTC_GPIO10 (GPIO4)
-	RTC_GPIO11 (GPIO0)
-	RTC_GPIO12 (GPIO2)
-	RTC_GPIO13 (GPIO15)
-	RTC_GPIO14 (GPIO13)
-	RTC_GPIO15 (GPIO12)
-	RTC_GPIO16 (GPIO14)
-	RTC_GPIO17 (GPIO27)

Learn how to use the RTC GPIOs to wake up the ESP32 from deep sleep: ESP32 Deep Sleep with Arduino IDE and Wake Up Sources

## PWM
The ESP32 LED PWM controller has 16 independent channels that can be configured to generate PWM signals with different properties. All pins that can act as outputs can be used as PWM pins (GPIOs 34 to 39 can’t generate PWM).

To set a PWM signal, you need to define these parameters in the code:

-	Signal’s frequency;
-	Duty cycle;
-	PWM channel;
-	GPIO where you want to output the signal.

Learn how to use ESP32 PWM with Arduino IDE: ESP32 PWM with Arduino IDE

## I2C
When using the ESP32 with the Arduino IDE, you should use the ESP32 I2C default pins (supported by the Wire library):

-	GPIO 21 (SDA)
-	GPIO 22 (SCL)

## SPI
By default, the pin mapping for SPI is:

| **SPI**  | **MOSI**  | **MISO** | **CLK** | **CS**  |
| -------- | --------- | -------- | ------- | ------- |
| **VSPI** | GPIO 23   | GPIO 19  | GPIO 18 | GPIO 5  |
| **HSPI** | GPIO 13   | GPIO 12  | GPIO 14 | GPIO 15 |


UART
The ESP32 supports up to three UART interfaces: UART0, UART1, and UART2, depending on the ESP32 board model you’re using.

UART0 is usually reserved for communication with the serial monitor during upload and debugging. However, you can also use it for communication with other devices after uploading the code if the Serial Monitor is not needed.
UART1 and UART2: available to communicate with external devices.
Like I2C and SPI, these UART pins can be mapped to any GPIO pin on the ESP32. However, they have a default pin assignment on most board models.

For most ESP32 boards the UART pin assignment is as follows:

| UART Port	| TX	    | RX	    | Remarks                                                                     |
| --------	| ------- | ------- | --------------------------------------------------------------------------- |
| UART0	    | GPIO 1	| GPIO 3	| Used for Serial Monitor and uploading code; Can be assigned to other GPIOs; |
| UART1	    | GPIO 10	| GPIO 9	| Must be assigned to other GPIOs                                             |
| UART2	    | GPIO 17	| GPIO 16	| Can be assigned to other GPIOs                                              |

About UART1 (GPIO 9 and GPIO10) – these GPIOs are connected to the ESP32 SPI flash memory, so you can’t use them like that. To use UART1 to communicate with other devices, you must define different pins using the HardwareSerial library.

## Interrupts
All GPIOs can be configured as interrupts.
Learn how to use interrupts with the ESP32:
-	ESP32 interrupts with Arduino IDE
-	ESP32 interrupts with MicroPython

## Strapping Pins
The ESP32 chip has the following strapping pins:
-	GPIO 0
-	GPIO 2
-	GPIO 4
-	GPIO 5
-	GPIO 12
-	GPIO 15

These are used to put the ESP32 into bootloader or flashing mode. On most development boards with built-in USB/Serial, you don’t need to worry about the state of these pins. The board puts the pins in the right state for flashing or boot mode. More information on the ESP32 Boot Mode Selection can be found here.
However, if you have peripherals connected to those pins, you may have trouble trying to upload new code, flashing the ESP32 with new firmware or resetting the board. If you have some peripherals connected to the strapping pins and you are getting trouble uploading code or flashing the ESP32, it may be because those peripherals are preventing the ESP32 to enter the right mode. Read the Boot Mode Selection documentation to guide you in the right direction. After resetting, flashing, or booting, those pins work as expected.

## Pins HIGH at Boot
Some GPIOs change its state to HIGH or output PWM signals at boot or reset. This means that if you have outputs connected to these GPIOs you may get unexpected results when the ESP32 resets or boots.
-	GPIO 1
-	GPIO 3
-	GPIO 5
-	GPIO 6–GPIO 11 (connected to the ESP32 integrated SPI flash memory – not recommended to use).
-	GPIO 14
-	GPIO 15

## Enable (EN)
Enable (EN) is the 3.3V regulator’s enable pin. It’s pulled up, so connect to ground to disable the 3.3V regulator. This means that you can use this pin connected to a pushbutton to restart your ESP32, for example.

## GPIO current drawn
The absolute maximum current drawn per GPIO is 40mA according to the “Recommended Operating Conditions” section in the ESP32 datasheet.

## ESP32 Built-In Hall Effect Sensor
The ESP32 also features a built-in hall effect sensor that detects changes in the magnetic field in its surroundings.

## Wrapping Up
We hope you’ve found this reference guide for the ESP32 GPIOs useful. If you have more tips about the ESP32 GPIOs, please share by writing a comment down below.
