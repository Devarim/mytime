
import fa from './components/Helpers/Fa.vue'

import moment from 'moment'

export default {
    components : {
        fa
    },
    filters : {
        date(value,format) {
            format = format ? format : 'DD/MM/YY';
            return moment(value).format(format);
        },
        datetime(value) {
            return moment(value).format('HH:mm');
        }
    }
}