package ma.projectteam.myapp.web.rest;

import ma.projectteam.myapp.ProjectTeamDemoApp;
import ma.projectteam.myapp.domain.Utilisateur;
import ma.projectteam.myapp.repository.UtilisateurRepository;
import ma.projectteam.myapp.repository.search.UtilisateurSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UtilisateurResource} REST controller.
 */
@SpringBootTest(classes = ProjectTeamDemoApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class UtilisateurResourceIT {

    private static final String DEFAULT_E_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_E_MAIL = "BBBBBBBBBB";

    private static final String DEFAULT_P_HONENUMBER = "AAAAAAAAAA";
    private static final String UPDATED_P_HONENUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_U_SERNAME = "AAAAAAAAAA";
    private static final String UPDATED_U_SERNAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_L_ASTSEEN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_L_ASTSEEN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_D_EACTIVATIONDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_D_EACTIVATIONDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_F_IRSTNAME = "AAAAAAAAAA";
    private static final String UPDATED_F_IRSTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_L_ASTNAME = "AAAAAAAAAA";
    private static final String UPDATED_L_ASTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_O_CCUPATION = "AAAAAAAAAA";
    private static final String UPDATED_O_CCUPATION = "BBBBBBBBBB";

    private static final String DEFAULT_C_ITY = "AAAAAAAAAA";
    private static final String UPDATED_C_ITY = "BBBBBBBBBB";

    private static final String DEFAULT_K_IND = "AAAAAAAAAA";
    private static final String UPDATED_K_IND = "BBBBBBBBBB";

    private static final Integer DEFAULT_C_REATEDBY = 1;
    private static final Integer UPDATED_C_REATEDBY = 2;

    private static final Instant DEFAULT_C_REATEDAT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_C_REATEDAT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_U_PDATEDBY = 1;
    private static final Integer UPDATED_U_PDATEDBY = 2;

    private static final Instant DEFAULT_U_PDATEDAT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_U_PDATEDAT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private UtilisateurRepository utilisateurRepositoryMock;

    /**
     * This repository is mocked in the ma.projectteam.myapp.repository.search test package.
     *
     * @see ma.projectteam.myapp.repository.search.UtilisateurSearchRepositoryMockConfiguration
     */
    @Autowired
    private UtilisateurSearchRepository mockUtilisateurSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUtilisateurMockMvc;

    private Utilisateur utilisateur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Utilisateur createEntity(EntityManager em) {
        Utilisateur utilisateur = new Utilisateur()
            .eMAIL(DEFAULT_E_MAIL)
            .pHONENUMBER(DEFAULT_P_HONENUMBER)
            .uSERNAME(DEFAULT_U_SERNAME)
            .lASTSEEN(DEFAULT_L_ASTSEEN)
            .dEACTIVATIONDATE(DEFAULT_D_EACTIVATIONDATE)
            .fIRSTNAME(DEFAULT_F_IRSTNAME)
            .lASTNAME(DEFAULT_L_ASTNAME)
            .oCCUPATION(DEFAULT_O_CCUPATION)
            .cITY(DEFAULT_C_ITY)
            .kIND(DEFAULT_K_IND)
            .cREATEDBY(DEFAULT_C_REATEDBY)
            .cREATEDAT(DEFAULT_C_REATEDAT)
            .uPDATEDBY(DEFAULT_U_PDATEDBY)
            .uPDATEDAT(DEFAULT_U_PDATEDAT);
        return utilisateur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Utilisateur createUpdatedEntity(EntityManager em) {
        Utilisateur utilisateur = new Utilisateur()
            .eMAIL(UPDATED_E_MAIL)
            .pHONENUMBER(UPDATED_P_HONENUMBER)
            .uSERNAME(UPDATED_U_SERNAME)
            .lASTSEEN(UPDATED_L_ASTSEEN)
            .dEACTIVATIONDATE(UPDATED_D_EACTIVATIONDATE)
            .fIRSTNAME(UPDATED_F_IRSTNAME)
            .lASTNAME(UPDATED_L_ASTNAME)
            .oCCUPATION(UPDATED_O_CCUPATION)
            .cITY(UPDATED_C_ITY)
            .kIND(UPDATED_K_IND)
            .cREATEDBY(UPDATED_C_REATEDBY)
            .cREATEDAT(UPDATED_C_REATEDAT)
            .uPDATEDBY(UPDATED_U_PDATEDBY)
            .uPDATEDAT(UPDATED_U_PDATEDAT);
        return utilisateur;
    }

    @BeforeEach
    public void initTest() {
        utilisateur = createEntity(em);
    }

    @Test
    @Transactional
    public void createUtilisateur() throws Exception {
        int databaseSizeBeforeCreate = utilisateurRepository.findAll().size();
        // Create the Utilisateur
        restUtilisateurMockMvc.perform(post("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isCreated());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeCreate + 1);
        Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
        assertThat(testUtilisateur.geteMAIL()).isEqualTo(DEFAULT_E_MAIL);
        assertThat(testUtilisateur.getpHONENUMBER()).isEqualTo(DEFAULT_P_HONENUMBER);
        assertThat(testUtilisateur.getuSERNAME()).isEqualTo(DEFAULT_U_SERNAME);
        assertThat(testUtilisateur.getlASTSEEN()).isEqualTo(DEFAULT_L_ASTSEEN);
        assertThat(testUtilisateur.getdEACTIVATIONDATE()).isEqualTo(DEFAULT_D_EACTIVATIONDATE);
        assertThat(testUtilisateur.getfIRSTNAME()).isEqualTo(DEFAULT_F_IRSTNAME);
        assertThat(testUtilisateur.getlASTNAME()).isEqualTo(DEFAULT_L_ASTNAME);
        assertThat(testUtilisateur.getoCCUPATION()).isEqualTo(DEFAULT_O_CCUPATION);
        assertThat(testUtilisateur.getcITY()).isEqualTo(DEFAULT_C_ITY);
        assertThat(testUtilisateur.getkIND()).isEqualTo(DEFAULT_K_IND);
        assertThat(testUtilisateur.getcREATEDBY()).isEqualTo(DEFAULT_C_REATEDBY);
        assertThat(testUtilisateur.getcREATEDAT()).isEqualTo(DEFAULT_C_REATEDAT);
        assertThat(testUtilisateur.getuPDATEDBY()).isEqualTo(DEFAULT_U_PDATEDBY);
        assertThat(testUtilisateur.getuPDATEDAT()).isEqualTo(DEFAULT_U_PDATEDAT);

        // Validate the Utilisateur in Elasticsearch
        verify(mockUtilisateurSearchRepository, times(1)).save(testUtilisateur);
    }

    @Test
    @Transactional
    public void createUtilisateurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = utilisateurRepository.findAll().size();

        // Create the Utilisateur with an existing ID
        utilisateur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUtilisateurMockMvc.perform(post("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeCreate);

        // Validate the Utilisateur in Elasticsearch
        verify(mockUtilisateurSearchRepository, times(0)).save(utilisateur);
    }


    @Test
    @Transactional
    public void getAllUtilisateurs() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        // Get all the utilisateurList
        restUtilisateurMockMvc.perform(get("/api/utilisateurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(utilisateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].eMAIL").value(hasItem(DEFAULT_E_MAIL)))
            .andExpect(jsonPath("$.[*].pHONENUMBER").value(hasItem(DEFAULT_P_HONENUMBER)))
            .andExpect(jsonPath("$.[*].uSERNAME").value(hasItem(DEFAULT_U_SERNAME)))
            .andExpect(jsonPath("$.[*].lASTSEEN").value(hasItem(DEFAULT_L_ASTSEEN.toString())))
            .andExpect(jsonPath("$.[*].dEACTIVATIONDATE").value(hasItem(DEFAULT_D_EACTIVATIONDATE.toString())))
            .andExpect(jsonPath("$.[*].fIRSTNAME").value(hasItem(DEFAULT_F_IRSTNAME)))
            .andExpect(jsonPath("$.[*].lASTNAME").value(hasItem(DEFAULT_L_ASTNAME)))
            .andExpect(jsonPath("$.[*].oCCUPATION").value(hasItem(DEFAULT_O_CCUPATION)))
            .andExpect(jsonPath("$.[*].cITY").value(hasItem(DEFAULT_C_ITY)))
            .andExpect(jsonPath("$.[*].kIND").value(hasItem(DEFAULT_K_IND)))
            .andExpect(jsonPath("$.[*].cREATEDBY").value(hasItem(DEFAULT_C_REATEDBY)))
            .andExpect(jsonPath("$.[*].cREATEDAT").value(hasItem(DEFAULT_C_REATEDAT.toString())))
            .andExpect(jsonPath("$.[*].uPDATEDBY").value(hasItem(DEFAULT_U_PDATEDBY)))
            .andExpect(jsonPath("$.[*].uPDATEDAT").value(hasItem(DEFAULT_U_PDATEDAT.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllUtilisateursWithEagerRelationshipsIsEnabled() throws Exception {
        when(utilisateurRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restUtilisateurMockMvc.perform(get("/api/utilisateurs?eagerload=true"))
            .andExpect(status().isOk());

        verify(utilisateurRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllUtilisateursWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(utilisateurRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restUtilisateurMockMvc.perform(get("/api/utilisateurs?eagerload=true"))
            .andExpect(status().isOk());

        verify(utilisateurRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        // Get the utilisateur
        restUtilisateurMockMvc.perform(get("/api/utilisateurs/{id}", utilisateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(utilisateur.getId().intValue()))
            .andExpect(jsonPath("$.eMAIL").value(DEFAULT_E_MAIL))
            .andExpect(jsonPath("$.pHONENUMBER").value(DEFAULT_P_HONENUMBER))
            .andExpect(jsonPath("$.uSERNAME").value(DEFAULT_U_SERNAME))
            .andExpect(jsonPath("$.lASTSEEN").value(DEFAULT_L_ASTSEEN.toString()))
            .andExpect(jsonPath("$.dEACTIVATIONDATE").value(DEFAULT_D_EACTIVATIONDATE.toString()))
            .andExpect(jsonPath("$.fIRSTNAME").value(DEFAULT_F_IRSTNAME))
            .andExpect(jsonPath("$.lASTNAME").value(DEFAULT_L_ASTNAME))
            .andExpect(jsonPath("$.oCCUPATION").value(DEFAULT_O_CCUPATION))
            .andExpect(jsonPath("$.cITY").value(DEFAULT_C_ITY))
            .andExpect(jsonPath("$.kIND").value(DEFAULT_K_IND))
            .andExpect(jsonPath("$.cREATEDBY").value(DEFAULT_C_REATEDBY))
            .andExpect(jsonPath("$.cREATEDAT").value(DEFAULT_C_REATEDAT.toString()))
            .andExpect(jsonPath("$.uPDATEDBY").value(DEFAULT_U_PDATEDBY))
            .andExpect(jsonPath("$.uPDATEDAT").value(DEFAULT_U_PDATEDAT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingUtilisateur() throws Exception {
        // Get the utilisateur
        restUtilisateurMockMvc.perform(get("/api/utilisateurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();

        // Update the utilisateur
        Utilisateur updatedUtilisateur = utilisateurRepository.findById(utilisateur.getId()).get();
        // Disconnect from session so that the updates on updatedUtilisateur are not directly saved in db
        em.detach(updatedUtilisateur);
        updatedUtilisateur
            .eMAIL(UPDATED_E_MAIL)
            .pHONENUMBER(UPDATED_P_HONENUMBER)
            .uSERNAME(UPDATED_U_SERNAME)
            .lASTSEEN(UPDATED_L_ASTSEEN)
            .dEACTIVATIONDATE(UPDATED_D_EACTIVATIONDATE)
            .fIRSTNAME(UPDATED_F_IRSTNAME)
            .lASTNAME(UPDATED_L_ASTNAME)
            .oCCUPATION(UPDATED_O_CCUPATION)
            .cITY(UPDATED_C_ITY)
            .kIND(UPDATED_K_IND)
            .cREATEDBY(UPDATED_C_REATEDBY)
            .cREATEDAT(UPDATED_C_REATEDAT)
            .uPDATEDBY(UPDATED_U_PDATEDBY)
            .uPDATEDAT(UPDATED_U_PDATEDAT);

        restUtilisateurMockMvc.perform(put("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUtilisateur)))
            .andExpect(status().isOk());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
        Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
        assertThat(testUtilisateur.geteMAIL()).isEqualTo(UPDATED_E_MAIL);
        assertThat(testUtilisateur.getpHONENUMBER()).isEqualTo(UPDATED_P_HONENUMBER);
        assertThat(testUtilisateur.getuSERNAME()).isEqualTo(UPDATED_U_SERNAME);
        assertThat(testUtilisateur.getlASTSEEN()).isEqualTo(UPDATED_L_ASTSEEN);
        assertThat(testUtilisateur.getdEACTIVATIONDATE()).isEqualTo(UPDATED_D_EACTIVATIONDATE);
        assertThat(testUtilisateur.getfIRSTNAME()).isEqualTo(UPDATED_F_IRSTNAME);
        assertThat(testUtilisateur.getlASTNAME()).isEqualTo(UPDATED_L_ASTNAME);
        assertThat(testUtilisateur.getoCCUPATION()).isEqualTo(UPDATED_O_CCUPATION);
        assertThat(testUtilisateur.getcITY()).isEqualTo(UPDATED_C_ITY);
        assertThat(testUtilisateur.getkIND()).isEqualTo(UPDATED_K_IND);
        assertThat(testUtilisateur.getcREATEDBY()).isEqualTo(UPDATED_C_REATEDBY);
        assertThat(testUtilisateur.getcREATEDAT()).isEqualTo(UPDATED_C_REATEDAT);
        assertThat(testUtilisateur.getuPDATEDBY()).isEqualTo(UPDATED_U_PDATEDBY);
        assertThat(testUtilisateur.getuPDATEDAT()).isEqualTo(UPDATED_U_PDATEDAT);

        // Validate the Utilisateur in Elasticsearch
        verify(mockUtilisateurSearchRepository, times(1)).save(testUtilisateur);
    }

    @Test
    @Transactional
    public void updateNonExistingUtilisateur() throws Exception {
        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUtilisateurMockMvc.perform(put("/api/utilisateurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Utilisateur in Elasticsearch
        verify(mockUtilisateurSearchRepository, times(0)).save(utilisateur);
    }

    @Test
    @Transactional
    public void deleteUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        int databaseSizeBeforeDelete = utilisateurRepository.findAll().size();

        // Delete the utilisateur
        restUtilisateurMockMvc.perform(delete("/api/utilisateurs/{id}", utilisateur.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Utilisateur in Elasticsearch
        verify(mockUtilisateurSearchRepository, times(1)).deleteById(utilisateur.getId());
    }

    @Test
    @Transactional
    public void searchUtilisateur() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);
        when(mockUtilisateurSearchRepository.search(queryStringQuery("id:" + utilisateur.getId())))
            .thenReturn(Collections.singletonList(utilisateur));

        // Search the utilisateur
        restUtilisateurMockMvc.perform(get("/api/_search/utilisateurs?query=id:" + utilisateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(utilisateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].eMAIL").value(hasItem(DEFAULT_E_MAIL)))
            .andExpect(jsonPath("$.[*].pHONENUMBER").value(hasItem(DEFAULT_P_HONENUMBER)))
            .andExpect(jsonPath("$.[*].uSERNAME").value(hasItem(DEFAULT_U_SERNAME)))
            .andExpect(jsonPath("$.[*].lASTSEEN").value(hasItem(DEFAULT_L_ASTSEEN.toString())))
            .andExpect(jsonPath("$.[*].dEACTIVATIONDATE").value(hasItem(DEFAULT_D_EACTIVATIONDATE.toString())))
            .andExpect(jsonPath("$.[*].fIRSTNAME").value(hasItem(DEFAULT_F_IRSTNAME)))
            .andExpect(jsonPath("$.[*].lASTNAME").value(hasItem(DEFAULT_L_ASTNAME)))
            .andExpect(jsonPath("$.[*].oCCUPATION").value(hasItem(DEFAULT_O_CCUPATION)))
            .andExpect(jsonPath("$.[*].cITY").value(hasItem(DEFAULT_C_ITY)))
            .andExpect(jsonPath("$.[*].kIND").value(hasItem(DEFAULT_K_IND)))
            .andExpect(jsonPath("$.[*].cREATEDBY").value(hasItem(DEFAULT_C_REATEDBY)))
            .andExpect(jsonPath("$.[*].cREATEDAT").value(hasItem(DEFAULT_C_REATEDAT.toString())))
            .andExpect(jsonPath("$.[*].uPDATEDBY").value(hasItem(DEFAULT_U_PDATEDBY)))
            .andExpect(jsonPath("$.[*].uPDATEDAT").value(hasItem(DEFAULT_U_PDATEDAT.toString())));
    }
}
