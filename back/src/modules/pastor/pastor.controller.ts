import { Request, Response, NextFunction } from 'express';

import { MissingParamError, NotFoundError } from '../../config/errors';
import { getEngagementByPastorId } from '../engagement/engagement.service'
import { getPastorById } from './pastor.service'
import { GetPastorDTO, GetPastorResponseDTO, GetPastorEngagementsDTO, GetPastorEngagementsResponseDTO } from './pastor.dto';

// We could also validate that pastorId is a UUID
const validatePastorId = (pastorId: string | undefined) => {
  if (!pastorId) throw new MissingParamError("pastor_id");
  return pastorId;
};

export const getPastor = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const dto: GetPastorDTO = { pastor_id: validatePastorId(req.params.pastor_id) };

		const pastor = await getPastorById(dto.pastor_id);

		if (!pastor) throw new NotFoundError('pastor');

		return res.json(pastor as GetPastorResponseDTO);
	} catch (error) {
		return next(error);
	}
}

export const getPastorEngagements = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const dto: GetPastorEngagementsDTO = {
      pastor_id: validatePastorId(req.params.pastor_id),
      page: parseInt(req.query.page as string) || undefined,
      limit: parseInt(req.query.limit as string) || undefined
    };

		const engagements = await getEngagementByPastorId(dto.pastor_id, dto.page, dto.limit);

		return res.json(engagements as GetPastorEngagementsResponseDTO);
	} catch (error) {
		return next(error);
	}
}