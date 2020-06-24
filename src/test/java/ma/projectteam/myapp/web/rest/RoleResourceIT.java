package ma.projectteam.myapp.web.rest;

import ma.projectteam.myapp.ProjectTeamDemoApp;
import ma.projectteam.myapp.domain.Role;
import ma.projectteam.myapp.repository.RoleRepository;
import ma.projectteam.myapp.repository.search.RoleSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RoleResource} REST controller.
 */
@SpringBootTest(classes = ProjectTeamDemoApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class RoleResourceIT {

    private static final String DEFAULT_N_AME = "AAAAAAAAAA";
    private static final String UPDATED_N_AME = "BBBBBBBBBB";

    private static final String DEFAULT_C_ODE = "AAAAAAAAAA";
    private static final String UPDATED_C_ODE = "BBBBBBBBBB";

    private static final String DEFAULT_D_ESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_D_ESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_C_REATEDBY = 1;
    private static final Integer UPDATED_C_REATEDBY = 2;

    private static final Instant DEFAULT_C_REATEDAT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_C_REATEDAT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_U_PDATEDBY = 1;
    private static final Integer UPDATED_U_PDATEDBY = 2;

    private static final Instant DEFAULT_U_PDATEDAT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_U_PDATEDAT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RoleRepository roleRepository;

    /**
     * This repository is mocked in the ma.projectteam.myapp.repository.search test package.
     *
     * @see ma.projectteam.myapp.repository.search.RoleSearchRepositoryMockConfiguration
     */
    @Autowired
    private RoleSearchRepository mockRoleSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRoleMockMvc;

    private Role role;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Role createEntity(EntityManager em) {
        Role role = new Role()
            .nAME(DEFAULT_N_AME)
            .cODE(DEFAULT_C_ODE)
            .dESCRIPTION(DEFAULT_D_ESCRIPTION)
            .cREATEDBY(DEFAULT_C_REATEDBY)
            .cREATEDAT(DEFAULT_C_REATEDAT)
            .uPDATEDBY(DEFAULT_U_PDATEDBY)
            .uPDATEDAT(DEFAULT_U_PDATEDAT);
        return role;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Role createUpdatedEntity(EntityManager em) {
        Role role = new Role()
            .nAME(UPDATED_N_AME)
            .cODE(UPDATED_C_ODE)
            .dESCRIPTION(UPDATED_D_ESCRIPTION)
            .cREATEDBY(UPDATED_C_REATEDBY)
            .cREATEDAT(UPDATED_C_REATEDAT)
            .uPDATEDBY(UPDATED_U_PDATEDBY)
            .uPDATEDAT(UPDATED_U_PDATEDAT);
        return role;
    }

    @BeforeEach
    public void initTest() {
        role = createEntity(em);
    }

    @Test
    @Transactional
    public void createRole() throws Exception {
        int databaseSizeBeforeCreate = roleRepository.findAll().size();
        // Create the Role
        restRoleMockMvc.perform(post("/api/roles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(role)))
            .andExpect(status().isCreated());

        // Validate the Role in the database
        List<Role> roleList = roleRepository.findAll();
        assertThat(roleList).hasSize(databaseSizeBeforeCreate + 1);
        Role testRole = roleList.get(roleList.size() - 1);
        assertThat(testRole.getnAME()).isEqualTo(DEFAULT_N_AME);
        assertThat(testRole.getcODE()).isEqualTo(DEFAULT_C_ODE);
        assertThat(testRole.getdESCRIPTION()).isEqualTo(DEFAULT_D_ESCRIPTION);
        assertThat(testRole.getcREATEDBY()).isEqualTo(DEFAULT_C_REATEDBY);
        assertThat(testRole.getcREATEDAT()).isEqualTo(DEFAULT_C_REATEDAT);
        assertThat(testRole.getuPDATEDBY()).isEqualTo(DEFAULT_U_PDATEDBY);
        assertThat(testRole.getuPDATEDAT()).isEqualTo(DEFAULT_U_PDATEDAT);

        // Validate the Role in Elasticsearch
        verify(mockRoleSearchRepository, times(1)).save(testRole);
    }

    @Test
    @Transactional
    public void createRoleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = roleRepository.findAll().size();

        // Create the Role with an existing ID
        role.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoleMockMvc.perform(post("/api/roles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(role)))
            .andExpect(status().isBadRequest());

        // Validate the Role in the database
        List<Role> roleList = roleRepository.findAll();
        assertThat(roleList).hasSize(databaseSizeBeforeCreate);

        // Validate the Role in Elasticsearch
        verify(mockRoleSearchRepository, times(0)).save(role);
    }


    @Test
    @Transactional
    public void getAllRoles() throws Exception {
        // Initialize the database
        roleRepository.saveAndFlush(role);

        // Get all the roleList
        restRoleMockMvc.perform(get("/api/roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(role.getId().intValue())))
            .andExpect(jsonPath("$.[*].nAME").value(hasItem(DEFAULT_N_AME)))
            .andExpect(jsonPath("$.[*].cODE").value(hasItem(DEFAULT_C_ODE)))
            .andExpect(jsonPath("$.[*].dESCRIPTION").value(hasItem(DEFAULT_D_ESCRIPTION)))
            .andExpect(jsonPath("$.[*].cREATEDBY").value(hasItem(DEFAULT_C_REATEDBY)))
            .andExpect(jsonPath("$.[*].cREATEDAT").value(hasItem(DEFAULT_C_REATEDAT.toString())))
            .andExpect(jsonPath("$.[*].uPDATEDBY").value(hasItem(DEFAULT_U_PDATEDBY)))
            .andExpect(jsonPath("$.[*].uPDATEDAT").value(hasItem(DEFAULT_U_PDATEDAT.toString())));
    }
    
    @Test
    @Transactional
    public void getRole() throws Exception {
        // Initialize the database
        roleRepository.saveAndFlush(role);

        // Get the role
        restRoleMockMvc.perform(get("/api/roles/{id}", role.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(role.getId().intValue()))
            .andExpect(jsonPath("$.nAME").value(DEFAULT_N_AME))
            .andExpect(jsonPath("$.cODE").value(DEFAULT_C_ODE))
            .andExpect(jsonPath("$.dESCRIPTION").value(DEFAULT_D_ESCRIPTION))
            .andExpect(jsonPath("$.cREATEDBY").value(DEFAULT_C_REATEDBY))
            .andExpect(jsonPath("$.cREATEDAT").value(DEFAULT_C_REATEDAT.toString()))
            .andExpect(jsonPath("$.uPDATEDBY").value(DEFAULT_U_PDATEDBY))
            .andExpect(jsonPath("$.uPDATEDAT").value(DEFAULT_U_PDATEDAT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRole() throws Exception {
        // Get the role
        restRoleMockMvc.perform(get("/api/roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRole() throws Exception {
        // Initialize the database
        roleRepository.saveAndFlush(role);

        int databaseSizeBeforeUpdate = roleRepository.findAll().size();

        // Update the role
        Role updatedRole = roleRepository.findById(role.getId()).get();
        // Disconnect from session so that the updates on updatedRole are not directly saved in db
        em.detach(updatedRole);
        updatedRole
            .nAME(UPDATED_N_AME)
            .cODE(UPDATED_C_ODE)
            .dESCRIPTION(UPDATED_D_ESCRIPTION)
            .cREATEDBY(UPDATED_C_REATEDBY)
            .cREATEDAT(UPDATED_C_REATEDAT)
            .uPDATEDBY(UPDATED_U_PDATEDBY)
            .uPDATEDAT(UPDATED_U_PDATEDAT);

        restRoleMockMvc.perform(put("/api/roles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRole)))
            .andExpect(status().isOk());

        // Validate the Role in the database
        List<Role> roleList = roleRepository.findAll();
        assertThat(roleList).hasSize(databaseSizeBeforeUpdate);
        Role testRole = roleList.get(roleList.size() - 1);
        assertThat(testRole.getnAME()).isEqualTo(UPDATED_N_AME);
        assertThat(testRole.getcODE()).isEqualTo(UPDATED_C_ODE);
        assertThat(testRole.getdESCRIPTION()).isEqualTo(UPDATED_D_ESCRIPTION);
        assertThat(testRole.getcREATEDBY()).isEqualTo(UPDATED_C_REATEDBY);
        assertThat(testRole.getcREATEDAT()).isEqualTo(UPDATED_C_REATEDAT);
        assertThat(testRole.getuPDATEDBY()).isEqualTo(UPDATED_U_PDATEDBY);
        assertThat(testRole.getuPDATEDAT()).isEqualTo(UPDATED_U_PDATEDAT);

        // Validate the Role in Elasticsearch
        verify(mockRoleSearchRepository, times(1)).save(testRole);
    }

    @Test
    @Transactional
    public void updateNonExistingRole() throws Exception {
        int databaseSizeBeforeUpdate = roleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoleMockMvc.perform(put("/api/roles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(role)))
            .andExpect(status().isBadRequest());

        // Validate the Role in the database
        List<Role> roleList = roleRepository.findAll();
        assertThat(roleList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Role in Elasticsearch
        verify(mockRoleSearchRepository, times(0)).save(role);
    }

    @Test
    @Transactional
    public void deleteRole() throws Exception {
        // Initialize the database
        roleRepository.saveAndFlush(role);

        int databaseSizeBeforeDelete = roleRepository.findAll().size();

        // Delete the role
        restRoleMockMvc.perform(delete("/api/roles/{id}", role.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Role> roleList = roleRepository.findAll();
        assertThat(roleList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Role in Elasticsearch
        verify(mockRoleSearchRepository, times(1)).deleteById(role.getId());
    }

    @Test
    @Transactional
    public void searchRole() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        roleRepository.saveAndFlush(role);
        when(mockRoleSearchRepository.search(queryStringQuery("id:" + role.getId())))
            .thenReturn(Collections.singletonList(role));

        // Search the role
        restRoleMockMvc.perform(get("/api/_search/roles?query=id:" + role.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(role.getId().intValue())))
            .andExpect(jsonPath("$.[*].nAME").value(hasItem(DEFAULT_N_AME)))
            .andExpect(jsonPath("$.[*].cODE").value(hasItem(DEFAULT_C_ODE)))
            .andExpect(jsonPath("$.[*].dESCRIPTION").value(hasItem(DEFAULT_D_ESCRIPTION)))
            .andExpect(jsonPath("$.[*].cREATEDBY").value(hasItem(DEFAULT_C_REATEDBY)))
            .andExpect(jsonPath("$.[*].cREATEDAT").value(hasItem(DEFAULT_C_REATEDAT.toString())))
            .andExpect(jsonPath("$.[*].uPDATEDBY").value(hasItem(DEFAULT_U_PDATEDBY)))
            .andExpect(jsonPath("$.[*].uPDATEDAT").value(hasItem(DEFAULT_U_PDATEDAT.toString())));
    }
}
