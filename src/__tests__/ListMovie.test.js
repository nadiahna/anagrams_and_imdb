import React from 'react';
import axios from 'axios';
import { mount, shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import response from '../../__mocks__/responseMovie.json';
import ListMovie from '../pages/ListMovie';

const BASE_URL = 'http://www.omdbapi.com/?apikey=2f677b89';

function shallowSetup() {

    //const stubInitialState = null;
    //jest.spyOn(React, 'useState').mockImplementationOnce(() => realUseState(stubInitialState));

    return shallow(<ListMovie />);
    
}


describe('get movie', () => {
    const query = "batman"
    const page = "1"
    it('should set movie if success get network data', async function () {
        const mAxios = new MockAdapter(axios);
        mAxios.onGet(`${BASE_URL}&s=${query}&page=${page}`).reply(200, response);

        const wrapper = shallowSetup();
        console.table(wrapper.debug())
        //expect(wrapper.find(`div#${response.Search[0].imdbID}`)).toHaveLength(1);
       
    });
})