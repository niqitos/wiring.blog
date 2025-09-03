---
authors:
  - name: Niqitos
    avatar: /images/avatars/niqitos.jpg
tags:
  - Arduino
title: Установка Платы ESP32 В Arduino IDE На Windows
description: В этом руководстве мы расскажем, как установить плату ESP32 в
  Arduino IDE для Windows. Если вы используете Mac OS или Linux, следуйте этой
  инструкции.
seo:
  title: Установка Платы ESP32 В Arduino IDE На Windows
  description: В этом руководстве мы расскажем, как установить плату ESP32 в
    Arduino IDE для Windows. Если вы используете Mac OS или Linux, следуйте этой
    инструкции.
published: true
---

1\. Установка Arduino IDE

Скачать установщик можно с официального сайта arduino.cc/en/Main/Software 

2\. Установка ESP32 

Чтобы установить плату ESP32 в IDE Arduino, выполните следующие действия:

0\. Откройте окно настроек в Arduino IDE перейдя в Файл > Настройки

![7499834B-B462-4489-9ECA-B6918C238BD7.jpg](file:///7499834B-B462-4489-9ECA-B6918C238BD7.jpg)

 

1\. Введите [https://dl.espressif.com/dl/package\_esp32\_index.json]() в поле «Additional Board Manager URLs», как показано на рисунке ниже. Затем нажмите кнопку «ОК»:

![E22C42C8-3AC0-452E-AF05-16298E6BEAC5.jpg](file:///E22C42C8-3AC0-452E-AF05-16298E6BEAC5.jpg)

Если у вас уже есть URL-адрес плат ESP8266, вы указать их через запятую:

<https://dl.espressif.com/dl/package_esp32_index.json>, <http://arduino.esp8266.com/stable/package_esp8266com_index.json>

0\. Откройте менеджер плат перейдя в Инструменты > Плата > Диспетчер Плат…

![E0A8C21B-9C25-4DF2-B6D4-B293EB31FFA5.jpg](file:///E0A8C21B-9C25-4DF2-B6D4-B293EB31FFA5.jpg)

0\. В строке поиска введите ESP32 и нажмите кнопку «Установить» напротив “ESP32 by Espressif Systems“

![6C77E512-B0DB-4400-9869-874240D02731.jpg](file:///6C77E512-B0DB-4400-9869-874240D02731.jpg)

0\. Готово. Установка займет несколько секунд.

Настройка

Подключите плату ESP32 к вашему компьютеру и выполните следующие действия:

0\. Откройте Arduino IDE

0\. Выберите свою плату в меню Инструменты > Плата (в моем случае это плата ESP32 DEVKIT V1)

![7CBF18B1-26D1-441A-883C-73467C46DA45.jpg](file:///7CBF18B1-26D1-441A-883C-73467C46DA45.jpg)

0\. Выберите порт. Если вы не видите COM-порт в Arduino IDE, необходимо установить ESP32 CP210x USB to UART Bridge VCP Drivers:

![14FB2B11-20E0-430A-A19B-88CCD082D37E.jpg](file:///14FB2B11-20E0-430A-A19B-88CCD082D37E.jpg)

0\. Откройте следующий пример в меню Файл > Примеры > WiFiScan.

![B09F34EE-B91B-4D24-A4B7-D1469C5563B1.jpg](file:///B09F34EE-B91B-4D24-A4B7-D1469C5563B1.jpg)

0\. Откроется новый скетч:

![9F0154AD-C66B-4ADA-8D49-82310C1A7FA2.jpg](file:///9F0154AD-C66B-4ADA-8D49-82310C1A7FA2.jpg)

0\. Нажмите кнопку «Загрузить» в Arduino IDE. Подождите несколько секунд, пока код компилируется и загружается в плату.

![6718B75F-53D2-4F17-BDE9-5E87C229EE0B.jpg](file:///6718B75F-53D2-4F17-BDE9-5E87C229EE0B.jpg)

0\. Если все хорошо, вы должны увидеть сообщение «Done uploading»

![74722FEB-2018-4F64-B443-C4A19FD6C7FC.jpg](file:///74722FEB-2018-4F64-B443-C4A19FD6C7FC.jpg)

0\. Откройте монитор серийного порта Arduino IDE и установите скорость 115200 бод: 

![4E21F3B1-08B1-493A-8153-B8CCFB96BAD5.jpg](file:///4E21F3B1-08B1-493A-8153-B8CCFB96BAD5.jpg)

0\. Нажмите кнопку «EN» ESP32 на плате, и вы увидите сети, доступные рядом с вашим ESP32:

![FF215CAF-5BC2-4E40-A744-289818D33CEA.jpg](file:///FF215CAF-5BC2-4E40-A744-289818D33CEA.jpg)

В завершение

Это простое руководство, которое иллюстрирует, как подготовить вашу Arduino IDE для работы с ESP32 на ПК с Windows. 

Установка Arduino IDE на Mac OS или Linux https\://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-mac-and-linux-instructions

Устранение роблемам во время установки https\://randomnerdtutorials.com/esp32-troubleshooting-guide
