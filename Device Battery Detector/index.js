initBattery();

function initBattery() {
  const batteryLiquid = document.querySelector(".Bliquid");
  const batteryStatus = document.querySelector(".Bstatus");
  const batteryPercentage = document.querySelector(".Bpercentage");

  console.log(navigator);

  navigator.getBattery().then((batt) => {
    let battery = {
      level: 1,
      charging: false,
    };

    updateBattery = () => {
      let level = Math.floor(battery.level * 100);
      batteryPercentage.innerHTML = level + "%";
      batteryLiquid.style.height = `${parseInt(battery.level * 100)}%`;

      if (level == 100 && battery.charging) {
        batteryStatus.innerHTML = '충전 완료 :> <i class="ri-battery-2-fill green-color"></i>';
        batteryLiquid.style.height = "103%";
      } else if (level <= 20 && !battery.charging) {
        batteryStatus.innerHTML = '충전 필요 :< <i class="ri-plug-line animated-red"></i>';
      } else if (battery.charging) {
        batteryStatus.innerHTML = '충전중 ... <i class="ri-flashlight-line animated-green"></i>';
      } else {
        batteryStatus.innerHTML = "";
      }

      if (level <= 20) {
        batteryLiquid.classList.add("gradient-color-red");
        batteryLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-yellow");
      } else if (level <= 48) {
        batteryLiquid.classList.add("gradient-color-orange");
        batteryLiquid.classList.remove("gradient-color-green", "gradient-color-red", "gradient-color-yellow");
      } else if (level <= 80) {
        batteryLiquid.classList.add("gradient-color-yellow");
        batteryLiquid.classList.remove("gradient-color-green", "gradient-color-red", "gradient-color-orange");
      } else {
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove("gradient-color-yellow", "gradient-color-red", "gradient-color-orange");
      }
    };

    updateBattery();

    battery.addEventListener("chargingchange", () => {
      updateBattery();
    });
    battery.addEventListener("levelchange", () => {
      updateBattery;
    });
  });
}
