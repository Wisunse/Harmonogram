class Registry

  COMMON_YEAR_DAYS_IN_MONTH = [nil, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  def self.days_in_month(month, year = Time.now.year)
    return 29 if month == 2 && Date.gregorian_leap?(year)
    COMMON_YEAR_DAYS_IN_MONTH[month.to_i]
  end

  def self.all_registry
    sql = { statement: '
      SELECT registry.id,
        registry.cars_id,
        registry.data_start,
        registry.data_end,
        registry.info,
        accounts.login as account
      FROM registry
      LEFT JOIN accounts on accounts.id = registry.account_id order by registry.id
', values: [] }
    result = Tools.sql_query(sql)
    { all_registry: result.to_a }
  end

  def self.dates_now

    whole_date = Time.new
    month = whole_date.month
    year = whole_date.year
    days_count = days_in_month(month)

    { whole_date: whole_date, month: month, year: year, days_count: days_count }

  end

  def self.month_info(params)

    month = params[:month].to_i
    year = params[:year].to_i
    if month.zero?
      whole_date = Time.new
      month = whole_date.month
      year = whole_date.year
    else
      whole_date = Time.new(year, month)
    end
    days_count = days_in_month(month, year)

    { days_count: days_count, whole_date: whole_date, year: year, month: month }

  end

  def self.new_register(params, user_data)

    reg_id = params[:reg_id]
    data_start = params[:data_start]
    data_end = params[:data_end]
    info = params[:info]
    car_id = params[:car_id]
    account_id = user_data.to_i

    if reg_id.nil?
      sql = { statement: 'INSERT INTO registry (data_start, data_end, info, cars_id, account_id) values ($1, $2, $3, $4, $5)', values: [data_start, data_end, info, car_id, account_id] }
      Tools.sql_query(sql)
    else
      sql = { statement: 'UPDATE registry SET data_start=$1, data_end=$2, info=$3, account_id = $4  where id = $5', values: [ data_start, data_end, info, account_id.to_i, reg_id.to_i] }
      Tools.sql_query(sql)
    end

  end

  def self.delete_register(params)
    id = params[:picked_day][:reg_id]
    sql = { statement: 'DELETE FROM registry where id = $1', values: [id] }
    Tools.sql_query(sql)

  end

end