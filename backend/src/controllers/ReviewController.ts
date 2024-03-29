import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment';
import { Carrier } from '../entity/Carrier';
import { User } from '../entity/User';
import { Review } from '../entity/Review';
import { validateJOI } from '../middleware/validateJOI'
import { schemas } from '../schemas'
class ReviewController implements IControllerBase {

  public path = '/review'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }
  public initRoutes() {
    this.router.get(this.path + '/carrier/:carrierId', validateJOI(schemas.reviewGetByCarrierId, 'paramas'), async (req, res) => {
      try {
        const reviewRepository = getRepository(Review);
        const reviewFromDB = await reviewRepository.find({ relations: ["carrier", "user"]});
        const carrierId = req.params.carrierId;
        const reviews = reviewFromDB.filter(review => review.carrier.id === +carrierId)
        
        res.send(reviews);
      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      }
    });
    this.router.post(this.path, validateJOI(schemas.reviewPOST, 'body'), async (req, res) => {
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
        res.status(400)
        res.send("Error " + e);
      };
    }); 
  }

}
export default ReviewController