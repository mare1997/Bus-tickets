import * as express from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface";
import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment';
import { Carrier } from '../entity/Carrier';
import { User } from '../entity/User';
import { validateJOI } from '../middleware/validateJOI'
import { schemas } from '../schemas'
class CommentCotroller implements IControllerBase {

  public path = '/comment'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }
  public initRoutes() {
    this.router.get(this.path + '/carrier/:carrierId',validateJOI(schemas.commentGetByCarrierId, 'paramas'), async (req, res) => {
      try {
        const commentRepository = getRepository(Comment);
        const commentFromDB = await commentRepository.find({ relations: ["carrier", "user"]});
        const carrierId = req.params.carrierId;
        var comments = [];
        commentFromDB.forEach(comment => {
          if (!comment.deleted && !comment.hidden && comment.carrier.id === parseInt(carrierId)) {
            comments.push(comment);
          }
        });
        res.status(200)
        res.send(comments);
      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      }
    });
    this.router.post(this.path, validateJOI(schemas.commentPOST, 'body'), async (req, res) => {
      try {
        const commentRepository = getRepository(Comment);
        const carrierRepository = getRepository(Carrier);
        const userRepository = getRepository(User);
        let comment = req.body;

        let carrier = await carrierRepository.findOne(comment.carrierId);
        let user = {}
        if (comment.userId) {
          user = await userRepository.findOne(comment.userId);
        }
        comment.carrier = carrier
        comment.user = user

        await commentRepository.save(comment);

        res.status(201);
        res.send(comment);

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });
    this.router.put(this.path, validateJOI(schemas.carrierPUT, 'body'), async (req, res) => {
      try {
        const commentRepository = getRepository(Comment);
        const carrierRepository = getRepository(Carrier);
        const userRepository = getRepository(User);
        let comment = req.body;

        let carrier = await carrierRepository.findOne(comment.carrierId);
        let user = {}
        if (comment.userId) {
          user = await userRepository.findOne(comment.userId);
        }
        comment.carrier = carrier
        comment.user = user

        await commentRepository.save(comment);

        res.status(201);
        res.send(comment);

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });

    this.router.put(this.path + '/hide/:commentId', validateJOI(schemas.commentGetByCommentId, 'params'), async (req, res) => {
      try {
        const commentRepository = getRepository(Comment);
        var commentId = req.params.commentId;
        const comment = await commentRepository.findOne(commentId);
        comment.hidden = true;
        await commentRepository.save(comment);

        res.send(200);

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });

    this.router.delete(this.path + '/:commentId', validateJOI(schemas.commentGetByCommentId, 'params'), async (req, res) => {
      try {
        const commentRepository = getRepository(Comment);
        var commentId = req.params.commentId;
        const comment = await commentRepository.findOne(commentId);
        comment.deleted = true;
        await commentRepository.save(comment);

        res.send(200);

      } catch (e) {
        res.status(400)
        res.send("Error " + e);
      };
    });

  }

}
export default CommentCotroller