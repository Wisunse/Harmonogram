class Cars

  def self.all_cars
    sql = { statement: 'SELECT *  FROM cars order by id', values: [] }
    result = Tools.sql_query(sql)
    { all_cars: result.to_a }
  end

  def self.new_car(params)
    name = params[:name]
    sql = { statement: 'INSERT INTO cars(name) VALUES($1)', values: [name] }
    Tools.sql_query(sql)
    '1'
  end

  def self.edit_car(params)
    id = params[:id]
    name = params[:name]
    sql = { statement: 'UPDATE cars set name=$1 where id = $2', values: [name, id] }
    Tools.sql_query(sql)
    '1'
  end

end