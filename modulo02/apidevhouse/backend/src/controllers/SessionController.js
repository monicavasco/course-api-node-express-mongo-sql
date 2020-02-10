// métodos: index, show, update, store, destroy
/* index:listagem de sessoes
store: criar uma sessao
show: quando queremos listar uma unica sessao
update: quando queremos alterar alguma sessao
destroy: quando queremos deletar uma sessao */

import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
	async store(req, res) {
		// chama o metodo store

		const schema = Yup.object().shape({
			email: Yup.string()
				.email()
				.required(),
		});

		const { email } = req.body; // pega o email que esta mandando na requisicao

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Falha na validação.' });
		}

		let user = await User.findOne({ email }); // procura um registro no BD

		if (!user) {
			user = await User.create({ email }); // criando o email no BD
		}
		//

		return res.json(user); // retorna pro usuario
	}
}

export default new SessionController();
