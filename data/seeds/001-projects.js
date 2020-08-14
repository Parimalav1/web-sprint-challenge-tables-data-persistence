exports.seed = function(knex) {
  return knex('projects').insert([ // or return knex('schemes').truncate()
    {id: 1,name: 'Arts and crafts'},
    {id: 2,name: 'Rocks and Stalactites'},
    {id: 3,name: 'Grafting'},
    {id: 4,name: 'Volcano'},
    {id: 5,name: 'Rainbow'},
    {id: 6,name: 'Puppet Theater'}
  ]);
};
