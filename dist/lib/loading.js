import ora from "ora";
let oraSpinner = null;
export const loading = {
    start() {
        console.time();
        oraSpinner = ora("Loading...").start();
    },
    stop() {
        oraSpinner?.stop();
        oraSpinner?.clear();
        console.timeEnd();
    },
};
