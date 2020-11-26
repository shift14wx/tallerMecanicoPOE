package com.mecanica.org.web.rest;

import com.mecanica.org.TallerMecanicoPoeApp;
import com.mecanica.org.domain.ClasificacionAutomovil;
import com.mecanica.org.repository.ClasificacionAutomovilRepository;

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
 * Integration tests for the {@link ClasificacionAutomovilResource} REST controller.
 */
@SpringBootTest(classes = TallerMecanicoPoeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ClasificacionAutomovilResourceIT {

    private static final String DEFAULT_CLASIFICACION = "AAAAAAAAAA";
    private static final String UPDATED_CLASIFICACION = "BBBBBBBBBB";

    @Autowired
    private ClasificacionAutomovilRepository clasificacionAutomovilRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClasificacionAutomovilMockMvc;

    private ClasificacionAutomovil clasificacionAutomovil;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClasificacionAutomovil createEntity(EntityManager em) {
        ClasificacionAutomovil clasificacionAutomovil = new ClasificacionAutomovil()
            .clasificacion(DEFAULT_CLASIFICACION);
        return clasificacionAutomovil;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClasificacionAutomovil createUpdatedEntity(EntityManager em) {
        ClasificacionAutomovil clasificacionAutomovil = new ClasificacionAutomovil()
            .clasificacion(UPDATED_CLASIFICACION);
        return clasificacionAutomovil;
    }

    @BeforeEach
    public void initTest() {
        clasificacionAutomovil = createEntity(em);
    }

    @Test
    @Transactional
    public void createClasificacionAutomovil() throws Exception {
        int databaseSizeBeforeCreate = clasificacionAutomovilRepository.findAll().size();
        // Create the ClasificacionAutomovil
        restClasificacionAutomovilMockMvc.perform(post("/api/clasificacion-automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clasificacionAutomovil)))
            .andExpect(status().isCreated());

        // Validate the ClasificacionAutomovil in the database
        List<ClasificacionAutomovil> clasificacionAutomovilList = clasificacionAutomovilRepository.findAll();
        assertThat(clasificacionAutomovilList).hasSize(databaseSizeBeforeCreate + 1);
        ClasificacionAutomovil testClasificacionAutomovil = clasificacionAutomovilList.get(clasificacionAutomovilList.size() - 1);
        assertThat(testClasificacionAutomovil.getClasificacion()).isEqualTo(DEFAULT_CLASIFICACION);
    }

    @Test
    @Transactional
    public void createClasificacionAutomovilWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clasificacionAutomovilRepository.findAll().size();

        // Create the ClasificacionAutomovil with an existing ID
        clasificacionAutomovil.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClasificacionAutomovilMockMvc.perform(post("/api/clasificacion-automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clasificacionAutomovil)))
            .andExpect(status().isBadRequest());

        // Validate the ClasificacionAutomovil in the database
        List<ClasificacionAutomovil> clasificacionAutomovilList = clasificacionAutomovilRepository.findAll();
        assertThat(clasificacionAutomovilList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllClasificacionAutomovils() throws Exception {
        // Initialize the database
        clasificacionAutomovilRepository.saveAndFlush(clasificacionAutomovil);

        // Get all the clasificacionAutomovilList
        restClasificacionAutomovilMockMvc.perform(get("/api/clasificacion-automovils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clasificacionAutomovil.getId().intValue())))
            .andExpect(jsonPath("$.[*].clasificacion").value(hasItem(DEFAULT_CLASIFICACION)));
    }
    
    @Test
    @Transactional
    public void getClasificacionAutomovil() throws Exception {
        // Initialize the database
        clasificacionAutomovilRepository.saveAndFlush(clasificacionAutomovil);

        // Get the clasificacionAutomovil
        restClasificacionAutomovilMockMvc.perform(get("/api/clasificacion-automovils/{id}", clasificacionAutomovil.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clasificacionAutomovil.getId().intValue()))
            .andExpect(jsonPath("$.clasificacion").value(DEFAULT_CLASIFICACION));
    }
    @Test
    @Transactional
    public void getNonExistingClasificacionAutomovil() throws Exception {
        // Get the clasificacionAutomovil
        restClasificacionAutomovilMockMvc.perform(get("/api/clasificacion-automovils/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClasificacionAutomovil() throws Exception {
        // Initialize the database
        clasificacionAutomovilRepository.saveAndFlush(clasificacionAutomovil);

        int databaseSizeBeforeUpdate = clasificacionAutomovilRepository.findAll().size();

        // Update the clasificacionAutomovil
        ClasificacionAutomovil updatedClasificacionAutomovil = clasificacionAutomovilRepository.findById(clasificacionAutomovil.getId()).get();
        // Disconnect from session so that the updates on updatedClasificacionAutomovil are not directly saved in db
        em.detach(updatedClasificacionAutomovil);
        updatedClasificacionAutomovil
            .clasificacion(UPDATED_CLASIFICACION);

        restClasificacionAutomovilMockMvc.perform(put("/api/clasificacion-automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedClasificacionAutomovil)))
            .andExpect(status().isOk());

        // Validate the ClasificacionAutomovil in the database
        List<ClasificacionAutomovil> clasificacionAutomovilList = clasificacionAutomovilRepository.findAll();
        assertThat(clasificacionAutomovilList).hasSize(databaseSizeBeforeUpdate);
        ClasificacionAutomovil testClasificacionAutomovil = clasificacionAutomovilList.get(clasificacionAutomovilList.size() - 1);
        assertThat(testClasificacionAutomovil.getClasificacion()).isEqualTo(UPDATED_CLASIFICACION);
    }

    @Test
    @Transactional
    public void updateNonExistingClasificacionAutomovil() throws Exception {
        int databaseSizeBeforeUpdate = clasificacionAutomovilRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClasificacionAutomovilMockMvc.perform(put("/api/clasificacion-automovils")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clasificacionAutomovil)))
            .andExpect(status().isBadRequest());

        // Validate the ClasificacionAutomovil in the database
        List<ClasificacionAutomovil> clasificacionAutomovilList = clasificacionAutomovilRepository.findAll();
        assertThat(clasificacionAutomovilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClasificacionAutomovil() throws Exception {
        // Initialize the database
        clasificacionAutomovilRepository.saveAndFlush(clasificacionAutomovil);

        int databaseSizeBeforeDelete = clasificacionAutomovilRepository.findAll().size();

        // Delete the clasificacionAutomovil
        restClasificacionAutomovilMockMvc.perform(delete("/api/clasificacion-automovils/{id}", clasificacionAutomovil.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ClasificacionAutomovil> clasificacionAutomovilList = clasificacionAutomovilRepository.findAll();
        assertThat(clasificacionAutomovilList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
