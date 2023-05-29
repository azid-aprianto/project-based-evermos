import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
      "VUsItersPut.html": htmlReport(data),
    };
  }

export const options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: 'per-vu-iterations',
            vus: 1000,
            iterations: 3500,
            maxDuration: '2s',
        },
    },
};

export default function(){
    const res = http.put('https://reqres.in/api/users/1');
    check(res, {
        'response code was 200': (res) => res.status == 200,
    });
}

