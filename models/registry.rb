class Registry

  COMMON_YEAR_DAYS_IN_MONTH = [nil, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  def self.days_in_month(month, year = Time.now.year)
    return 29 if month == 2 && Date.gregorian_leap?(year)
    COMMON_YEAR_DAYS_IN_MONTH[month.to_i]
  end

  def self.all_registry
    sql = { statement: 'SELECT *  FROM registry order by id', values: [] }
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

    month = params[:month]
    days_count = days_in_month(month)

    {days_count: days_count}

  end



end