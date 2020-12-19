import {browser} from 'protractor'
import {HomePage} from './pages/homePage'
import {expect} from 'chai'
import {testData} from '../testData'


describe('Films', function () {

    const homepage = new HomePage();

    beforeEach( async function(){
        browser.waitForAngularEnabled(false);
        await homepage.openPage();
    });

    it('Verify top rated movie',  async function () {

        let topRatedFilm = await homepage.getTopRatedFilm();

        expect(topRatedFilm.nameOfTopRatedFilm).equal(testData.topRatedFilm.filmName);
        expect(topRatedFilm.releaseDateOfTopRatedFilm).equal(testData.topRatedFilm.releaseDate);
        expect(topRatedFilm.rateOfTopRatedFilm).equal(testData.topRatedFilm.filmRate);
    });

    it('Search for specific movie', async function(){

        await homepage.searchFor(testData.searchFilmData.filmName);
        let foundFilmData = await homepage.getFoundFilmData();

        expect(foundFilmData.searchResultMovieName).equal(testData.searchFilmData.filmName);
        expect(foundFilmData.searchResultMovieReleaseDate).equal(testData.searchFilmData.releaseDate);
        expect(foundFilmData.searchResultMovieRate).equal(testData.searchFilmData.filmRate);
    });
});