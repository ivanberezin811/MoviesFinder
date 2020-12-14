import {browser, $, $$, ExpectedConditions as EC, element, By} from 'protractor'
import {testData} from './testData'

describe('Films', function () {

    beforeEach(function(){
        browser.waitForAngularEnabled(false);
    });

    it('Verify top rated movie',  async function () {
        browser.get('/');
        let topRatedFilm = $$('movie-card').get(0);
    
        let nameOfTopRatedFilm = await topRatedFilm.$('.caption h4').getText();

        let releaseDateOfTopRatedFilm = await topRatedFilm.$('.caption h4+p').getText();
        releaseDateOfTopRatedFilm = releaseDateOfTopRatedFilm.split(' ')[2];

        let rateOfTopRatedFilm = await topRatedFilm.$('.caption p+p small').getText();

        expect(nameOfTopRatedFilm).toBe(testData.topRatedFilm.filmName);
        expect(releaseDateOfTopRatedFilm).toBe(testData.topRatedFilm.releaseDate);
        expect(rateOfTopRatedFilm).toBe(testData.topRatedFilm.filmRate);
    });

    it('Search for specific movie', async function(){
        let inputElem = $(`.jumbotron [name='searchStr']`);
        let searchButton = $(`.jumbotron button`);

        browser.get('/');

        await browser.wait(EC.visibilityOf(inputElem));
        inputElem.sendKeys(testData.searchFilmData.filmName);

        await browser.wait(EC.elementToBeClickable(searchButton));
        searchButton.click();

        await browser.wait(EC.visibilityOf(element(By.cssContainingText('.jumbotron+div h3', 'Search Results'))));
        await browser.wait(EC.visibilityOf($('.jumbotron+div movie-card')));

        let searchResultMovie = $('.jumbotron+div movie-card');
        let searchResultMovieName = await searchResultMovie.$('.caption h4').getText();
        
        let searchResultMovieReleaseDate = await searchResultMovie.$('.caption h4+p').getText();
        searchResultMovieReleaseDate = searchResultMovieReleaseDate.split(' ')[2];

        let searchResultMovieRate = await searchResultMovie.$('.caption p+p small').getText();

        expect(searchResultMovieName).toBe(testData.searchFilmData.filmName);
        expect(searchResultMovieReleaseDate).toBe(testData.searchFilmData.releaseDate);
        expect(searchResultMovieRate).toBe(testData.searchFilmData.filmRate);
    });
});