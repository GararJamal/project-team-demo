package ma.projectteam.myapp.repository.search;

import ma.projectteam.myapp.domain.City;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link City} entity.
 */
public interface CitySearchRepository extends ElasticsearchRepository<City, Long> {
}
