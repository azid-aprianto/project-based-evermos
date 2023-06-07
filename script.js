import { CreateUser, UpdateUser } from './api/users.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check, group } from 'k6'

export const options = {
    summaryTrendStats: ['min', 'avg', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
    thresholds: {
        http_req_duration: ['p(90)<2000', 'p(95)<3000', 'p(99)<4000']
    },
    scenarios: {
        shared_iter_scenario: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 100,
            startTime: '0s',
        },
        per_vu_scenario: {
            executor: 'per-vu-iterations',
            vus: 10,
            iterations: 10,
            startTime: '10s',
        },
        ramping: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages:[
                { target: 10, duration: '30s' },
                { target: 50, duration: '1m' },
                { target: 10, duration: '30s' },
            ],
            gracefulRampDown: '0s',
        },
    },
};

export default function() {
    let id 

    group('Create User', () => {
        const payload = {
            'name': 'morpheus',
            'job': 'zion resident'
        };

        const res = CreateUser(payload)

        check(res, {
            'response code was 201': res.status == 201,
            'response time less than 200': res.timings.duration <= 2000,
            'verify response body': res.body.includes('zion')
        })
        
        if(res.error_code == 0){
            id = JSON.parse(res.body).id
        }
    })

    group('Update User', () => {
        const payload = {
            'name': 'morpheus',
            'job': 'zion resident'
      };

      const res = UpdateUser(payload, id)

      check(res, {
            'response code was 200' : res.status == 200,
            'response time less then 200' : res.timings.duration <= 2000,
        })
    })
}
