
import Sample1 from "../components/Sample1";
import Sample2 from "../components/Sample2";
import Sample3 from "../components/Sample3";

export const RoutePath = {
  sample1: {
    path: "/Sample1",
    name: "ボール出現サンプル",
    component: Sample1,
  },
  sample2: {
    path: "/Sample2",
    name: "移動・回転サンプル",
    component: Sample2,
  },
  sample3: {
    path: "/Sample3",
    name: "自動回転サンプル",
    component: Sample3,
  },
};
