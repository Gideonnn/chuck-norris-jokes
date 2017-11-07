import { async, inject, TestBed } from '@angular/core/testing';

import { JokeService } from './joke.service';

// Libs
import 'rxjs/add/operator/skip';

// Models
import { Joke } from '../../shared/models';

describe('JokeService', () => {

  const mockJoke: Joke = { id: 1, text: 'test', favorite: false };
  const mockJokes: Joke[] = [
    { ...mockJoke, id: 2, favorite: false },
    { ...mockJoke, id: 3, favorite: false },
    { ...mockJoke, id: 4, favorite: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JokeService,
      ]
    });
  });

  it('should be created', inject([JokeService], (service: JokeService) => {
    expect(service).toBeTruthy();
  }));

  describe('plumbing', () => {

    it('should update readonly jokes$ when _jokes$ is mutated', async(inject([JokeService], (service: JokeService) => {
      service.jokes$.skip(2).subscribe(jokes => {
        expect(jokes.length).toBe(1);
      });
      (<any>service)['_jokes$'].next(mockJoke);
    })));

  });

  describe('add', () => {

    it('should add joke to the \'add$\' Subject', async(inject([JokeService], (service: JokeService) => {
      (<any>service)['_add$'].subscribe((joke: Joke) => {
        expect(joke.id).toEqual(mockJoke.id);
      });
      service.add(mockJoke);
    })));

    it('should update jokes$ if a joke is added', async(inject([JokeService], (service: JokeService) => {

      // Hack to set up start state
      (<any>service)['_jokes$'].next(mockJokes);

      // Skip one to ignore initial value
      service.jokes$.skip(2).subscribe(jokes => {
        expect(jokes.length).toBe(4);
      });

      service.add(mockJoke);
    })));

  });

  describe('remove', () => {

    it('should add joke to the \'remove$\' Subject', async(inject([JokeService], (service: JokeService) => {
      (<any>service)['_remove$'].subscribe((joke: Joke) => {
        expect(joke.id).toEqual(mockJoke.id);
      });
      service.remove(mockJoke);
    })));

    it('should remove joke if supplied with a correct value', async(inject([JokeService], (service: JokeService) => {

      // Hack to set up start state
      (<any>service)['_jokes$'].next(mockJokes);

      // Skip one to ignore initial value
      service.jokes$.skip(2).subscribe(jokes => {
        expect(jokes.length).toBe(2);
      });

      service.remove(mockJoke);
    })));

    it('should NOT affect jokes array if supplied with an incorrect value', async(inject([JokeService], (service: JokeService) => {

      // Hack to set up start state
      (<any>service)['_jokes$'].next(mockJokes);

      // Skip one to ignore initial value
      service.jokes$.skip(2).subscribe(jokes => {
        expect(jokes.length).toBe(3);
      });

      service.remove({ ...mockJoke, id: 4 });
    })));

    it('should NOT throw an error when calling remove on an empty jokes array', async(inject([JokeService], (service: JokeService) => {

      // Hack to set up start state
      (<any>service)['_jokes$'].next([]);

      // Skip one to ignore initial value
      service.jokes$.skip(2).subscribe(jokes => {
        expect(jokes.length).toBe(3);
      });

      service.remove({ ...mockJoke, id: 4 });
    })));

  });

  describe('toggleFavorite', () => {

    it('should add joke to the \'toggle$\' Subject', async(inject([JokeService], (service: JokeService) => {
      (<any>service)['_toggle$'].subscribe((joke: Joke) => {
        expect(joke.id).toEqual(mockJoke.id);
      });
      service.toggleFavorite(mockJoke);
    })));

    it('should toggle second joke in the list', async(inject([JokeService], (service: JokeService) => {

      // Hack to set up start state
      (<any>service)['_jokes$'].next(mockJokes);

      // Skip one to ignore initial value
      service.jokes$.skip(2).subscribe(jokes => {
        expect(jokes[1].favorite).toBe(true);
      });

      service.toggleFavorite({ ...mockJoke, id: 3 });
    })));

  });

});
