import { ApiService } from './ApiService';

const endPonit = 'videos';

export const VideoService = {
    list(){
        return ApiService.get(endPonit);
    }
}