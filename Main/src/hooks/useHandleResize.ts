import useAppConfigStore from "@/store/AppConfig";
import { DeviceType } from "@/store/types";
import { onMounted, onUnmounted } from "vue";
export default function useHandleResize() {
  const appConfig = useAppConfigStore();
  onMounted(() => {
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);
  });
  onUnmounted(() => {
    handleScreenResize();
    window.removeEventListener("resize", handleScreenResize);
  });

  function handleScreenResize() {
    const width = document.body.clientWidth;
    if (width <= 768) {
      appConfig.changeDevice(DeviceType.MOBILE);
      appConfig.toggleCollapse(true);
    } else if (width < 992 && width > 768) {
      appConfig.changeDevice(DeviceType.PAD);
      appConfig.toggleCollapse(true);
    } else {
      appConfig.changeDevice(DeviceType.PC);
      appConfig.toggleCollapse(false);
    }
  }
}
// console.log("resize前:");
// console.log(appConfig.isCollapse);
// console.log(appConfig.deviceType);
// console.log("resize后:");
// console.log(appConfig.isCollapse);
// console.log(appConfig.deviceType);