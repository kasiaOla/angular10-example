import Announcement from '../models/announcement';
import { Request, Response, NextFunction } from 'express';

export class AnnouncementRoute {
  announcementRoute(app: any): void {
    app.route('/category/:id_category/type/:id_type').post((req: Request, res: Response, next: NextFunction) => {
      Announcement.create(req.body, (Error: any, data: any) => {
        if (Error) {
          return res.status(400).json({
            success: false,
            message: 'Error processing request ' + Error
          });
        } else {
          return res.status(200).json({
            success: true,
            message: 'Create was successful.',
            respons: data
          });
        }
      });
    });
    app.route('/get-announcements').get((req: Request, res: Response, next: NextFunction) => {
      Announcement.find((error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      });
    });

  }
}
