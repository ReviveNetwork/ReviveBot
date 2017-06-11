const Influx = require('influx');
const influx = new Influx.InfluxDB({
 host: process.env.INFLUX_HOST,
 database: 'discord',
 schema: [
    {
      measurement: 'statistics',
      fields: {
        count: Influx.FieldType.INTEGER
      },
      tags: [
        'type'
      ]
    }
  ]
});
module.exports = influx;
