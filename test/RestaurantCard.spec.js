import {mount} from '@vue/test-utils';
import RestaurantCard from '~/components/RestaurantCard.vue';

describe('RestaurantCard', ()=>{
    const props = {
        id:0,
        name:'nombre',
        description:'descripción',
        text: 'texto',
        slug: 'slug',
        category:'categoria',
        city:'ciudad',
        address:'dirección',
        likes:0,
        image:'skndvklnsdlkñvm'
    };
    //monta el componente:
    const wrapper = mount(RestaurantCard, {propsData: props});
    test('is mounted',()=>{
        expect(wrapper.isVueInstance()).toBe(true);
    });
    test('is rendering', ()=>{
        expect(wrapper.props().name).toBe('nombre');
        expect(wrapper.props().description).toBe('descripción');
    });
});