from gpiozero import PWMLED
from time import sleep
import random

red = PWMLED(17)
yellow = PWMLED(27)
green = PWMLED(22)
blue = PWMLED(23)
leds = [red, yellow, green, blue]

try:
    while True:
        led = random.choice(leds)
        led.pulse()
        sleep(2)
        led.off()
except KeyboardInterrupt:
    print("Program stopped")
    for led in leds:
        led.off()
