module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('tasks', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			tasks: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			check: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			update_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('tasks');
	},
};

// pendente sequelize db:migrate
