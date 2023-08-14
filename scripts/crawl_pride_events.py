import logging
import scrapy

logging.getLogger("scrapy").setLevel(logging.WARNING)


class scrapePrideEvents(scrapy.Spider):
    name = "Wikipedia Pride events"
    start_urls = ["https://en.wikipedia.org/wiki/List_of_LGBT_events"]

    def parse(self, response):
        tables = []
        # Go through all tables in Wikipedia page that are relevant (incl. wikitable class)
        for table in response.xpath('//*[contains(@class, "wikitable")]//tbody'):
            events = []
            # for each table go through all the rows
            for row in table.xpath("tr"):
                # parse the data into a respective object
                event = {
                    "LGBTQIA+ event": row.xpath("td[1]//text()").extract_first(),
                    "Location": row.xpath("td[2]//text()").extract_first(),
                    "Official website": row.xpath("td[3]//text()").extract_first(),
                    "Occurs every": row.xpath("td[4]//text()").extract_first(),
                    "Start": row.xpath("td[5]//text()").extract_first(),
                }
                # skip rows that have no values (that's the header)
                if None not in list(event.values()):
                    events.append(event)
            # Eventually get a list of grouped events
            tables.append(events)

        # to match the grouped events with the area headers, we get the index of each header and loop through it
        for index in range(len(response.css("div#mw-content-text>div>h2"))):
            # match back what the value is for respective index and get extracted text as header
            value = "".join(
                response.css("div#mw-content-text>div>h2")[index]
                .css("::text")
                .extract()
            )
            # skip the h2 headers at the end that are irrelevant (not ideal but there are no ids on this page)
            if value is not ("See also" or "References" or "External links"):
                # output finished array of objects with respective area and list of events matched based on index
                yield {
                    "area": value.strip().replace("[edit]", ""),
                    "events": tables[index],
                }
