import Reserva from '../models/Reserva';
import User from '../models/User';
import House from '../models/House';

class ReservaController {
	async index(req, res) {
		const { user_id } = req.headers;

		const reservas = await Reserva.find({ user: user_id }).populate('house');

		return res.json(reservas);
	}

	async store(req, res) {
		const { user_id } = req.headers;
		const { house_id } = req.params;
		const { date } = req.body;

		const house = await House.findById(house_id);
		if (!house) {
			return res.status(400).json({ error: 'Essa casa não existe.' });
		}

		if (house.status !== true) {
			return res.status(400).json({ error: 'Solicitação indisponivel.' });
		}

		const user = await User.findById(user_id);
		if (String(user_id) === String(house.user)) {
			return res.status(401).json({ error: 'Reserva não permitida.' });
		}

		const reserva = await Reserva.create({
			user: user_id,
			house: house_id,
			date,
		});

		await reserva
			.populate('house')
			.populate('user')
			.execPopulate();

		return res.json(reserva);
	}

	async destroy(req, res) {
		const { reserva_id } = req.body;

		await Reserva.findByIdAndDelete({ _id: reserva_id });

		return res.send();
	}
}

export default new ReservaController();
