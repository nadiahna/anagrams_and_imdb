import React from 'react';
import axios from 'axios';
import { mount, shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import DetailMovie from '../pages/DetailMovie'
import response from '../../__mocks__/responseMovieById.json';

const BASE_URL = 'http://www.omdbapi.com/?apikey=2f677b89&i=';

function shallowSetup() {

    const stubInitialState = null;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => realUseState(stubInitialState));

    return shallow(<DetailMovie />);
    
}

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/detail-movie/123"
    })
  }));
  

describe('get movie by path', () => {
    it('should set movie if success get network data', function () {
        const mAxios = new MockAdapter(axios);
        mAxios.onGet(`${BASE_URL}123`).reply(200, response);

        const wrapper = shallowSetup();
        // expect(wrapper.find('p#released').text()).toEqual(response.Released);
        // expect(wrapper.find('p#type').text()).toEqual(response.Type);
        //expect(wrapper.find('div#contentDetailMovie')).toHaveLength(1);
    
    });
})