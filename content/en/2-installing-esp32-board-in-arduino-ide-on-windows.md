---
id: 2
authors:
  - name: Niqitos
    avatar: /images/avatars/niqitos.jpg
tags:
  - Arduino
  - ESP32
title: Installing ESP32 Board In Arduino IDE On Windows
description: In this tutorial, we will show you how to install the ESP32 board
  in the Arduino IDE for Windows. If you are using Mac OS or Linux, follow these
  instructions.
seo:
  title: Installing ESP32 Board In Arduino IDE On Windows
  description: In this tutorial, we will show you how to install the ESP32 board
    in the Arduino IDE for Windows. If you are using Mac OS or Linux, follow
    these instructions.
published: true
date: 2025-09-02T00:00:00.000Z
sitemap:
  videos: []
  images: []
navigation:
  title: Installing ESP32 Board In Arduino IDE On Windows
---

## Установка Arduino IDE

Скачать установщик можно с официального сайта [arduino.cc/en/software](https://www.arduino.cc/en/software)

## Установка ESP32 

Чтобы установить плату ESP32 в IDE Arduino, выполните следующие действия:

1. Откройте окно настроек в Arduino IDE перейдя в *Файл > Настройки*
2. Введите \`<<https://dl.espressif.com/dl/package_esp32_index.json&#x60&#x3E&#x3E;;; в поле **«Additional Board Manager URLs»**, как показано на рисунке ниже. Затем нажмите кнопку **«ОК»**:

Если у вас уже есть URL-адрес плат ESP8266, вы указать их через запятую: `https://dl.espressif.com/dl/package_esp32_index.json, http://arduino.esp8266.com/stable/package_esp8266com_index.json`

3. Откройте менеджер плат перейдя в *Инструменты > Плата > Диспетчер Плат…*
4. В строке поиска введите ESP32 и нажмите кнопку «Установить» напротив “ESP32 by Espressif Systems“
5. Готово. Установка займет несколько секунд.

## Настройка

Подключите плату ESP32 к вашему компьютеру и выполните следующие действия:

1. Откройте Arduino IDE
2. Выберите свою плату в меню *Инструменты > Плата* (в моем случае это плата ESP32 DEVKIT V1)
3. Выберите порт. Если вы не видите COM-порт в Arduino IDE, необходимо установить ESP32 CP210x USB to UART Bridge VCP Drivers:
4. Откройте следующий пример в меню *Файл > Примеры > WiFiScan*.
5. Откроется новый скетч:
6. Нажмите кнопку «Загрузить» в Arduino IDE. Подождите несколько секунд, пока код компилируется и загружается в плату.
7. Если все хорошо, вы должны увидеть сообщение «Done uploading»
8. Откройте монитор серийного порта Arduino IDE и установите скорость 115200 бод: 
9. Нажмите кнопку «EN» ESP32 на плате, и вы увидите сети, доступные рядом с вашим ESP32:

## В завершение

Это простое руководство, которое иллюстрирует, как подготовить вашу Arduino IDE для работы с ESP32 на ПК с Windows.
