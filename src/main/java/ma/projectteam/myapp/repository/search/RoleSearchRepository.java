package ma.projectteam.myapp.repository.search;

import ma.projectteam.myapp.domain.Role;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Role} entity.
 */
public interface RoleSearchRepository extends ElasticsearchRepository<Role, Long> {
}
