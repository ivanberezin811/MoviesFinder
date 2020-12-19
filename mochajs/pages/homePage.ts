import {browser, By, element, $, $$, ExpectedConditions as EC} from 'protractor'

 export class HomePage {

    //Tot rated film
    private topRatedFilm = $$('movie-card').get(0);
    private nameOfTopRatedFilm = this.topRatedFilm.$('.caption h4');
    private releaseDateOfTopRatedFilm = this.topRatedFilm.$('.caption h4+p');
    private rateOfTopRatedFilm = this.topRatedFilm.$('.caption p+p small');

    private inputElem = $(`.jumbotron [name='searchStr']`);
    private searchButton = $(`.jumbotron button`);

    //Search result
    private searchResultMovie = $('.jumbotron+div movie-card');
    private searchResultMovieName = this.searchResultMovie.$('.caption h4');
    private searchResultMovieReleaseDate = this.searchResultMovie.$('.caption h4+p');
    private searchResultMovieRate = this.searchResultMovie.$('.caption p+p small');

    async openPage(){
        await browser.get('/');
    }

    async getTopRatedFilm(){
        return {
            nameOfTopRatedFilm: await this.nameOfTopRatedFilm.getText(),
            releaseDateOfTopRatedFilm: (await this.releaseDateOfTopRatedFilm.getText()).split(' ')[2],
            rateOfTopRatedFilm: await this.rateOfTopRatedFilm.getText()
        }
    }

    async searchFor(searchData: string | number){
        await browser.wait(EC.visibilityOf(this.inputElem));
        this.inputElem.sendKeys(searchData);

        await browser.wait(EC.elementToBeClickable(this.searchButton));
        this.searchButton.click();
    }

    async verifySearchResultIsDisplayed(){
        await browser.wait(EC.visibilityOf(element(By.cssContainingText('.jumbotron+div h3', 'Search Results'))));
        await browser.wait(EC.visibilityOf($('.jumbotron+div movie-card')));
    }

    async getFoundFilmData(){
        await this.verifySearchResultIsDisplayed();
        return {
            searchResultMovieName: await this.searchResultMovieName.getText(),
            searchResultMovieReleaseDate: (await this.searchResultMovieReleaseDate.getText()).split(' ')[2],
            searchResultMovieRate: await this.searchResultMovieRate.getText()
        }
    }
}