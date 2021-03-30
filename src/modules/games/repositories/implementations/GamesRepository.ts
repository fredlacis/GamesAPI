import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    
    const games = await this.repository
      .createQueryBuilder('game')
      .where('LOWER(game.title) LIKE :title', { title: `%${param.toLowerCase()}%` })
      .getMany();
      
    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    const count = await this.repository.query('SELECT COUNT(*) FROM games'); 
    return count;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    const { users } = await this.repository
      .createQueryBuilder('game')
      .innerJoinAndSelect("game.users", "user")
      .where('game.id = :id', { id })
      .getOneOrFail()
    
    return users;
  }
}
