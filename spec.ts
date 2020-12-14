import {browser, $, $$} from 'protractor'
import {testData} from './testData'

describe('Films', function () {
    it('Verify top rated film',  async function () {
        browser.waitForAngularEnabled(false);
        browser.get('/');
        let topRatedFilm = $$('movie-card').get(0);
    
        let nameOfTopRatedFilm = await topRatedFilm.$('.caption h4').getText();

        let releaseDateOfTopRatedFilm = await topRatedFilm.$('.caption h4+p').getText();
        let onlyDate = releaseDateOfTopRatedFilm.split(' ')[2];

        let rateOfTopRatedFilm = await topRatedFilm.$('.caption p+p small').getText();
        console.log('rateOfTopRatedFilm: ', rateOfTopRatedFilm);

        expect(nameOfTopRatedFilm).toBe(testData.topRatedFilm.filmName);
        expect(onlyDate).toBe(testData.topRatedFilm.releaseDate);
        expect(rateOfTopRatedFilm).toBe(testData.topRatedFilm.filmRate);
    });
});