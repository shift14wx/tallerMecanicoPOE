package com.mecanica.org.web.rest;

import com.mecanica.org.TallerMecanicoPoeApp;
import com.mecanica.org.domain.Automovil;
import com.mecanica.org.repository.AutomovilRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AutomovilResource} REST controller.
 */
@SpringBootTest(classes = TallerMecanicoPoeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AutomovilResourceIT {

    private static final String DEFAULT_PLACA = "AAAAAAAAAA";
    private static final String UPDATED_PLACA = "BBBBBBBBBB";

    private static final String DEFAULT_MODELO = "AAAAAAAAAA";
    private static final String UPDATED_MODELO = "BBBBBBBBBB";

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;

    private static final Integer DEFAULT_NASIENTOS = 1;
    private static final Integer UPDATED_NASIENTOS = 2;

    private static final String DEFAULT_ESTADOGENERALAUTOMOVIL = "AAAAAAAAAA";
    private static final String UPDATED_ESTADOGENERALAUTOMOVIL = "BBBBBBBBBB";

    private static final String DEFAULT_NUMEROMOTOR = "AAAAAAAAAA";
    private static final String UPDATED_NUMEROMOTOR = "BBBBBBBBBB";

    private static final String DEFAULT_NUMEROCHASISGRABADO = "AAAAAAAAAA";
    private static final String UPDATED_NUMEROCHASISGRABADO = "BBBBBBBBBB";

    @Autowired
    private AutomovilRepository automovilRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAutomovilMockMvc;

    private Automovil automovil;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Automovil createEntity(EntityManager em) {
        Automovil automovil = new Automovil()
            .placa(DEFAULT_PLACA)
            .modelo(DEFAULT_MODELO)
            .color(DEFAULT_COLOR)
            .year(DEFAULT_YEAR)
            .nasientos(DEFAULT_NASIENTOS)
            .estadogeneralautomovil(DEFAULT_ESTADOGENERALAUTOMOVIL)
            .numeromotor(DEFAULT_NUMEROMOTOR)
            .numerochasisgrabado(DEFAULT_NUMEROCHASISGRABADO);
        return automovil;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Automovil createUpdatedEntity(EntityManager em) {
        Automovil automovil = new Automovil()
            .placa(UPDATED_PLACA)
            .modelo(UPDATED_MODELO)
            .color(UPDATED_COLOR)
            .year(UPDATED_YEAR)
            .nasientos(UPDATED_NASIENTOS)
            .estadogeneralautomovil(UPDATED_ESTADOGENERALAUTOMOVIL)
            .numeromotor(UPDATED_NUMEROMOTOR)
            .numerochasisgrabado(UPDATED_NUMEROCHASISGRABADO);
        return automovil;
    }

    @BeforeEach
    public void initTest() {
        automovil = createEntity(em);
    }

    @Test
    @Transactional
    public void createAutomovil() throws Exception {
        int databaseSizeBeforeCreate = automovilRepository.findAll().size();
        // Create the Automovil
        restAutomovilMockMvc.perform(post("/api/automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(automovil)))
            .andExpect(status().isCreated());

        // Validate the Automovil in the database
        List<Automovil> automovilList = automovilRepository.findAll();
        assertThat(automovilList).hasSize(databaseSizeBeforeCreate + 1);
        Automovil testAutomovil = automovilList.get(automovilList.size() - 1);
        assertThat(testAutomovil.getPlaca()).isEqualTo(DEFAULT_PLACA);
        assertThat(testAutomovil.getModelo()).isEqualTo(DEFAULT_MODELO);
        assertThat(testAutomovil.getColor()).isEqualTo(DEFAULT_COLOR);
        assertThat(testAutomovil.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testAutomovil.getNasientos()).isEqualTo(DEFAULT_NASIENTOS);
        assertThat(testAutomovil.getEstadogeneralautomovil()).isEqualTo(DEFAULT_ESTADOGENERALAUTOMOVIL);
        assertThat(testAutomovil.getNumeromotor()).isEqualTo(DEFAULT_NUMEROMOTOR);
        assertThat(testAutomovil.getNumerochasisgrabado()).isEqualTo(DEFAULT_NUMEROCHASISGRABADO);
    }

    @Test
    @Transactional
    public void createAutomovilWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = automovilRepository.findAll().size();

        // Create the Automovil with an existing ID
        automovil.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutomovilMockMvc.perform(post("/api/automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(automovil)))
            .andExpect(status().isBadRequest());

        // Validate the Automovil in the database
        List<Automovil> automovilList = automovilRepository.findAll();
        assertThat(automovilList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAutomovils() throws Exception {
        // Initialize the database
        automovilRepository.saveAndFlush(automovil);

        // Get all the automovilList
        restAutomovilMockMvc.perform(get("/api/automovils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(automovil.getId().intValue())))
            .andExpect(jsonPath("$.[*].placa").value(hasItem(DEFAULT_PLACA)))
            .andExpect(jsonPath("$.[*].modelo").value(hasItem(DEFAULT_MODELO)))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR)))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)))
            .andExpect(jsonPath("$.[*].nasientos").value(hasItem(DEFAULT_NASIENTOS)))
            .andExpect(jsonPath("$.[*].estadogeneralautomovil").value(hasItem(DEFAULT_ESTADOGENERALAUTOMOVIL)))
            .andExpect(jsonPath("$.[*].numeromotor").value(hasItem(DEFAULT_NUMEROMOTOR)))
            .andExpect(jsonPath("$.[*].numerochasisgrabado").value(hasItem(DEFAULT_NUMEROCHASISGRABADO)));
    }
    
    @Test
    @Transactional
    public void getAutomovil() throws Exception {
        // Initialize the database
        automovilRepository.saveAndFlush(automovil);

        // Get the automovil
        restAutomovilMockMvc.perform(get("/api/automovils/{id}", automovil.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(automovil.getId().intValue()))
            .andExpect(jsonPath("$.placa").value(DEFAULT_PLACA))
            .andExpect(jsonPath("$.modelo").value(DEFAULT_MODELO))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR))
            .andExpect(jsonPath("$.nasientos").value(DEFAULT_NASIENTOS))
            .andExpect(jsonPath("$.estadogeneralautomovil").value(DEFAULT_ESTADOGENERALAUTOMOVIL))
            .andExpect(jsonPath("$.numeromotor").value(DEFAULT_NUMEROMOTOR))
            .andExpect(jsonPath("$.numerochasisgrabado").value(DEFAULT_NUMEROCHASISGRABADO));
    }
    @Test
    @Transactional
    public void getNonExistingAutomovil() throws Exception {
        // Get the automovil
        restAutomovilMockMvc.perform(get("/api/automovils/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAutomovil() throws Exception {
        // Initialize the database
        automovilRepository.saveAndFlush(automovil);

        int databaseSizeBeforeUpdate = automovilRepository.findAll().size();

        // Update the automovil
        Automovil updatedAutomovil = automovilRepository.findById(automovil.getId()).get();
        // Disconnect from session so that the updates on updatedAutomovil are not directly saved in db
        em.detach(updatedAutomovil);
        updatedAutomovil
            .placa(UPDATED_PLACA)
            .modelo(UPDATED_MODELO)
            .color(UPDATED_COLOR)
            .year(UPDATED_YEAR)
            .nasientos(UPDATED_NASIENTOS)
            .estadogeneralautomovil(UPDATED_ESTADOGENERALAUTOMOVIL)
            .numeromotor(UPDATED_NUMEROMOTOR)
            .numerochasisgrabado(UPDATED_NUMEROCHASISGRABADO);

        restAutomovilMockMvc.perform(put("/api/automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAutomovil)))
            .andExpect(status().isOk());

        // Validate the Automovil in the database
        List<Automovil> automovilList = automovilRepository.findAll();
        assertThat(automovilList).hasSize(databaseSizeBeforeUpdate);
        Automovil testAutomovil = automovilList.get(automovilList.size() - 1);
        assertThat(testAutomovil.getPlaca()).isEqualTo(UPDATED_PLACA);
        assertThat(testAutomovil.getModelo()).isEqualTo(UPDATED_MODELO);
        assertThat(testAutomovil.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testAutomovil.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testAutomovil.getNasientos()).isEqualTo(UPDATED_NASIENTOS);
        assertThat(testAutomovil.getEstadogeneralautomovil()).isEqualTo(UPDATED_ESTADOGENERALAUTOMOVIL);
        assertThat(testAutomovil.getNumeromotor()).isEqualTo(UPDATED_NUMEROMOTOR);
        assertThat(testAutomovil.getNumerochasisgrabado()).isEqualTo(UPDATED_NUMEROCHASISGRABADO);
    }

    @Test
    @Transactional
    public void updateNonExistingAutomovil() throws Exception {
        int databaseSizeBeforeUpdate = automovilRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutomovilMockMvc.perform(put("/api/automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(automovil)))
            .andExpect(status().isBadRequest());

        // Validate the Automovil in the database
        List<Automovil> automovilList = automovilRepository.findAll();
        assertThat(automovilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAutomovil() throws Exception {
        // Initialize the database
        automovilRepository.saveAndFlush(automovil);

        int databaseSizeBeforeDelete = automovilRepository.findAll().size();

        // Delete the automovil
        restAutomovilMockMvc.perform(delete("/api/automovils/{id}", automovil.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Automovil> automovilList = automovilRepository.findAll();
        assertThat(automovilList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
