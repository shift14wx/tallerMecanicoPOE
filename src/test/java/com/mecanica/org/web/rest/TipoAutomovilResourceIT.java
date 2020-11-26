package com.mecanica.org.web.rest;

import com.mecanica.org.TallerMecanicoPoeApp;
import com.mecanica.org.domain.TipoAutomovil;
import com.mecanica.org.repository.TipoAutomovilRepository;

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
 * Integration tests for the {@link TipoAutomovilResource} REST controller.
 */
@SpringBootTest(classes = TallerMecanicoPoeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoAutomovilResourceIT {

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    @Autowired
    private TipoAutomovilRepository tipoAutomovilRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoAutomovilMockMvc;

    private TipoAutomovil tipoAutomovil;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoAutomovil createEntity(EntityManager em) {
        TipoAutomovil tipoAutomovil = new TipoAutomovil()
            .tipo(DEFAULT_TIPO);
        return tipoAutomovil;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoAutomovil createUpdatedEntity(EntityManager em) {
        TipoAutomovil tipoAutomovil = new TipoAutomovil()
            .tipo(UPDATED_TIPO);
        return tipoAutomovil;
    }

    @BeforeEach
    public void initTest() {
        tipoAutomovil = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoAutomovil() throws Exception {
        int databaseSizeBeforeCreate = tipoAutomovilRepository.findAll().size();
        // Create the TipoAutomovil
        restTipoAutomovilMockMvc.perform(post("/api/tipo-automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoAutomovil)))
            .andExpect(status().isCreated());

        // Validate the TipoAutomovil in the database
        List<TipoAutomovil> tipoAutomovilList = tipoAutomovilRepository.findAll();
        assertThat(tipoAutomovilList).hasSize(databaseSizeBeforeCreate + 1);
        TipoAutomovil testTipoAutomovil = tipoAutomovilList.get(tipoAutomovilList.size() - 1);
        assertThat(testTipoAutomovil.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createTipoAutomovilWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoAutomovilRepository.findAll().size();

        // Create the TipoAutomovil with an existing ID
        tipoAutomovil.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoAutomovilMockMvc.perform(post("/api/tipo-automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoAutomovil)))
            .andExpect(status().isBadRequest());

        // Validate the TipoAutomovil in the database
        List<TipoAutomovil> tipoAutomovilList = tipoAutomovilRepository.findAll();
        assertThat(tipoAutomovilList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoAutomovils() throws Exception {
        // Initialize the database
        tipoAutomovilRepository.saveAndFlush(tipoAutomovil);

        // Get all the tipoAutomovilList
        restTipoAutomovilMockMvc.perform(get("/api/tipo-automovils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoAutomovil.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)));
    }
    
    @Test
    @Transactional
    public void getTipoAutomovil() throws Exception {
        // Initialize the database
        tipoAutomovilRepository.saveAndFlush(tipoAutomovil);

        // Get the tipoAutomovil
        restTipoAutomovilMockMvc.perform(get("/api/tipo-automovils/{id}", tipoAutomovil.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoAutomovil.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO));
    }
    @Test
    @Transactional
    public void getNonExistingTipoAutomovil() throws Exception {
        // Get the tipoAutomovil
        restTipoAutomovilMockMvc.perform(get("/api/tipo-automovils/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoAutomovil() throws Exception {
        // Initialize the database
        tipoAutomovilRepository.saveAndFlush(tipoAutomovil);

        int databaseSizeBeforeUpdate = tipoAutomovilRepository.findAll().size();

        // Update the tipoAutomovil
        TipoAutomovil updatedTipoAutomovil = tipoAutomovilRepository.findById(tipoAutomovil.getId()).get();
        // Disconnect from session so that the updates on updatedTipoAutomovil are not directly saved in db
        em.detach(updatedTipoAutomovil);
        updatedTipoAutomovil
            .tipo(UPDATED_TIPO);

        restTipoAutomovilMockMvc.perform(put("/api/tipo-automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoAutomovil)))
            .andExpect(status().isOk());

        // Validate the TipoAutomovil in the database
        List<TipoAutomovil> tipoAutomovilList = tipoAutomovilRepository.findAll();
        assertThat(tipoAutomovilList).hasSize(databaseSizeBeforeUpdate);
        TipoAutomovil testTipoAutomovil = tipoAutomovilList.get(tipoAutomovilList.size() - 1);
        assertThat(testTipoAutomovil.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoAutomovil() throws Exception {
        int databaseSizeBeforeUpdate = tipoAutomovilRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoAutomovilMockMvc.perform(put("/api/tipo-automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoAutomovil)))
            .andExpect(status().isBadRequest());

        // Validate the TipoAutomovil in the database
        List<TipoAutomovil> tipoAutomovilList = tipoAutomovilRepository.findAll();
        assertThat(tipoAutomovilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoAutomovil() throws Exception {
        // Initialize the database
        tipoAutomovilRepository.saveAndFlush(tipoAutomovil);

        int databaseSizeBeforeDelete = tipoAutomovilRepository.findAll().size();

        // Delete the tipoAutomovil
        restTipoAutomovilMockMvc.perform(delete("/api/tipo-automovils/{id}", tipoAutomovil.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoAutomovil> tipoAutomovilList = tipoAutomovilRepository.findAll();
        assertThat(tipoAutomovilList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
