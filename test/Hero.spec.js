import {mount} from '@vue/test-utils';
import Hero from '~/components/Hero.vue';
describe('Hero Component', ()=>{
    const SLOT_CONTENT = "<p>titulo de prueba</p>";
    const wrapper = mount(Hero, {slots:{header:SLOT_CONTENT}});

    test('is rendering in slot', ()=>{
        expect(wrapper.html()).toContain(SLOT_CONTENT);
    });

});