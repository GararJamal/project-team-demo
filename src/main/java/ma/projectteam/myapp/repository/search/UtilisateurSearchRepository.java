package ma.projectteam.myapp.repository.search;

import ma.projectteam.myapp.domain.Utilisateur;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Utilisateur} entity.
 */
public interface UtilisateurSearchRepository extends ElasticsearchRepository<Utilisateur, Long> {
}
