---
id: 3
authors:
  - name: Niqitos
    avatar: /images/avatars/niqitos.jpg
tags:
  - Arduino
  - ESP32
cover: /images/3/cover.webp
title: Установка платы ESP32 в Arduino IDE на Mac OS X и Linux
description: В этом руководстве мы расскажем, как установить плату ESP32 в
  Arduino IDE для Windows. Если вы используете Mac OS или Linux, следуйте этой
  инструкции.
seo:
  title: Установка платы ESP32 в Arduino IDE на Mac OS X и Linux
  description: В этом руководстве мы расскажем, как установить плату ESP32 в
    Arduino IDE для Windows. Если вы используете Mac OS или Linux, следуйте этой
    инструкции.
published: true
date: 2025-09-03T00:00:00.000Z
sitemap: true
---

## Установка Arduino IDE

Скачать установщик можно с официального сайта [arduino.cc/en/software](https://www.arduino.cc/en/software)

## Установка ESP32

Чтобы установить плату ESP32 в IDE Arduino, выполните следующие действия:

1. Откройте окно настроек в Arduino IDE перейдя в *Файл > Настройки*
2. В поле `Additional Board Manager URLs` введите следующее:

```text
https://dl.espressif.com/dl/package_esp32_index.json
```

3. Нажмите `ОК:

Если у вас уже есть URL-адрес плат ESP8266, вы указать их через запятую: `https://dl.espressif.com/dl/package_esp32_index.json, http://arduino.esp8266.com/stable/package_esp8266com_index.json`

4. Откройте менеджер плат перейдя в **Инструменты > Плата > Диспетчер Плат…**
5. В строке поиска введите ESP32 и нажмите `Установить напротив **ESP32 by Espressif Systems**
6. Готово. Установка займет несколько секунд.

## Настройка

Подключите плату ESP32 к вашему компьютеру и выполните следующие действия:

1. Откройте Arduino IDE
2. Выберите свою плату в меню **Инструменты > Плата** (в моем случае это плата ESP32 DEVKIT V1)
3. Выберите порт. Если вы не видите COM-порт в Arduino IDE, необходимо установить `ESP32 CP210x USB` to `UART Bridge VCP Drivers`:
4. Откройте следующий пример в меню **Файл > Примеры > WiFiScan**.
5. Откроется новый скетч:
6. Нажмите `Загрузить` в Arduino IDE. Подождите несколько секунд, пока код компилируется и загружается в плату.
7. Если все хорошо, вы должны увидеть сообщение «Done uploading»
8. Откройте монитор серийного порта Arduino IDE и установите скорость `115200` бод:
9. Нажмите `EN` на плате ESP32, и вы увидите сети, доступные рядом с вашим ESP32:

## В завершение

Это простое руководство, которое иллюстрирует, как подготовить вашу Arduino IDE для работы с ESP32 на ПК с Mac или Linux.
