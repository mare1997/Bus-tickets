import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment';
import { Carrier } from '../entity/Carrier';
import { User } from '../entity/User';
import { Review } from '../entity/Review';

class ReviewController implements IControllerBase {

  public path = '/review'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }
  public initRoutes() {
    this.router.get(this.path + '/carrier/:carrierId', async (req, res) => {
      try {
        const reviewRepository = getRepository(Review);
        const commentFromDB = await reviewRepository.find({ relations: ["carrier", "user"]});
        const carrierId = req.params.carrierId;
        var reviews = [];
        commentFromDB.forEach(review => {
          if (review.carrier.id === parseInt(carrierId)) {
            reviews.push(review);
          }
        });

        res.send(reviews);
      } catch (e) {

        res.send("Error " + e);
      }
    });
    this.router.post(this.path, async (req, res) => {
      try {
        const reviewRepository = getRepository(Review);
        const carrierRepository = getRepository(Carrier);
        const userRepository = getRepository(User);
        let review = req.body;

        let carrier = await carrierRepository.findOne(review.carrierId);
        let user = {}
        if (review.userId) {
          user = await userRepository.findOne(review.userId);
        }
        review.carrier = carrier
        review.user = user

        await reviewRepository.save(review);

        res.status(201);
        res.send(review);

      } catch (e) {

        res.send("Error " + e);
      };
    }); 
  }

}
export default ReviewController