
exports.up = function(knex) {
    return knex.schema 
    .createTable('projects', proj => {
        proj.increments('id');
        proj.string('name', 128).notNullable().unique().index();
        proj.text('description', 255).notNullable();
        proj.boolean('isCompleted').defaultTo(false);
    })

    .createTable('resources', rsc => {
        rsc.increments('id');
        rsc.string('name', 128).notNullable().unique().index();
        rsc.text('description', 255).notNullable();
    })

    .createTable('tasks', tasks => {
        tasks.increments('id');
        // items.integer('step_no').notNullable().unsigned();
        tasks.text('description', 255).notNullable();
        tasks.text('notes', 255).notNullable();
        tasks.boolean('isTaskCompleted').defaultTo(false);

        tasks.integer('project_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('projects')
            .onDelete("RESTRICT") // CASCADE, RESTRICT, SET NULL, DO NOTHING, SET DEFAULT
            .onUpdate("CASCADE");
    })

    .createTable('projects_resources', tbl => {
        tbl.increments('id');
        tbl.integer('project_id')
             .notNullable()
            .unsigned()
            .references('id')
            .inTable('projects')
            .onDelete("RESTRICT") // CASCADE, RESTRICT, SET NULL, DO NOTHING, SET DEFAULT
            .onUpdate("CASCADE");
        tbl.integer('resource_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('resources')
            .onDelete("RESTRICT") // CASCADE, RESTRICT, SET NULL, DO NOTHING, SET DEFAULT
            .onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('projects_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
};
