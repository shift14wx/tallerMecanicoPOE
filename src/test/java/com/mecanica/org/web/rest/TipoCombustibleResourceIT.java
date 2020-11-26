package com.mecanica.org.web.rest;

import com.mecanica.org.TallerMecanicoPoeApp;
import com.mecanica.org.domain.TipoCombustible;
import com.mecanica.org.repository.TipoCombustibleRepository;

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
 * Integration tests for the {@link TipoCombustibleResource} REST controller.
 */
@SpringBootTest(classes = TallerMecanicoPoeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoCombustibleResourceIT {

    private static final String DEFAULT_COMBUSTIBLE = "AAAAAAAAAA";
    private static final String UPDATED_COMBUSTIBLE = "BBBBBBBBBB";

    @Autowired
    private TipoCombustibleRepository tipoCombustibleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoCombustibleMockMvc;

    private TipoCombustible tipoCombustible;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoCombustible createEntity(EntityManager em) {
        TipoCombustible tipoCombustible = new TipoCombustible()
            .combustible(DEFAULT_COMBUSTIBLE);
        return tipoCombustible;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoCombustible createUpdatedEntity(EntityManager em) {
        TipoCombustible tipoCombustible = new TipoCombustible()
            .combustible(UPDATED_COMBUSTIBLE);
        return tipoCombustible;
    }

    @BeforeEach
    public void initTest() {
        tipoCombustible = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoCombustible() throws Exception {
        int databaseSizeBeforeCreate = tipoCombustibleRepository.findAll().size();
        // Create the TipoCombustible
        restTipoCombustibleMockMvc.perform(post("/api/tipo-combustibles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoCombustible)))
            .andExpect(status().isCreated());

        // Validate the TipoCombustible in the database
        List<TipoCombustible> tipoCombustibleList = tipoCombustibleRepository.findAll();
        assertThat(tipoCombustibleList).hasSize(databaseSizeBeforeCreate + 1);
        TipoCombustible testTipoCombustible = tipoCombustibleList.get(tipoCombustibleList.size() - 1);
        assertThat(testTipoCombustible.getCombustible()).isEqualTo(DEFAULT_COMBUSTIBLE);
    }

    @Test
    @Transactional
    public void createTipoCombustibleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoCombustibleRepository.findAll().size();

        // Create the TipoCombustible with an existing ID
        tipoCombustible.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoCombustibleMockMvc.perform(post("/api/tipo-combustibles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoCombustible)))
            .andExpect(status().isBadRequest());

        // Validate the TipoCombustible in the database
        List<TipoCombustible> tipoCombustibleList = tipoCombustibleRepository.findAll();
        assertThat(tipoCombustibleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoCombustibles() throws Exception {
        // Initialize the database
        tipoCombustibleRepository.saveAndFlush(tipoCombustible);

        // Get all the tipoCombustibleList
        restTipoCombustibleMockMvc.perform(get("/api/tipo-combustibles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoCombustible.getId().intValue())))
            .andExpect(jsonPath("$.[*].combustible").value(hasItem(DEFAULT_COMBUSTIBLE)));
    }
    
    @Test
    @Transactional
    public void getTipoCombustible() throws Exception {
        // Initialize the database
        tipoCombustibleRepository.saveAndFlush(tipoCombustible);

        // Get the tipoCombustible
        restTipoCombustibleMockMvc.perform(get("/api/tipo-combustibles/{id}", tipoCombustible.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoCombustible.getId().intValue()))
            .andExpect(jsonPath("$.combustible").value(DEFAULT_COMBUSTIBLE));
    }
    @Test
    @Transactional
    public void getNonExistingTipoCombustible() throws Exception {
        // Get the tipoCombustible
        restTipoCombustibleMockMvc.perform(get("/api/tipo-combustibles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoCombustible() throws Exception {
        // Initialize the database
        tipoCombustibleRepository.saveAndFlush(tipoCombustible);

        int databaseSizeBeforeUpdate = tipoCombustibleRepository.findAll().size();

        // Update the tipoCombustible
        TipoCombustible updatedTipoCombustible = tipoCombustibleRepository.findById(tipoCombustible.getId()).get();
        // Disconnect from session so that the updates on updatedTipoCombustible are not directly saved in db
        em.detach(updatedTipoCombustible);
        updatedTipoCombustible
            .combustible(UPDATED_COMBUSTIBLE);

        restTipoCombustibleMockMvc.perform(put("/api/tipo-combustibles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoCombustible)))
            .andExpect(status().isOk());

        // Validate the TipoCombustible in the database
        List<TipoCombustible> tipoCombustibleList = tipoCombustibleRepository.findAll();
        assertThat(tipoCombustibleList).hasSize(databaseSizeBeforeUpdate);
        TipoCombustible testTipoCombustible = tipoCombustibleList.get(tipoCombustibleList.size() - 1);
        assertThat(testTipoCombustible.getCombustible()).isEqualTo(UPDATED_COMBUSTIBLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoCombustible() throws Exception {
        int databaseSizeBeforeUpdate = tipoCombustibleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoCombustibleMockMvc.perform(put("/api/tipo-combustibles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoCombustible)))
            .andExpect(status().isBadRequest());

        // Validate the TipoCombustible in the database
        List<TipoCombustible> tipoCombustibleList = tipoCombustibleRepository.findAll();
        assertThat(tipoCombustibleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoCombustible() throws Exception {
        // Initialize the database
        tipoCombustibleRepository.saveAndFlush(tipoCombustible);

        int databaseSizeBeforeDelete = tipoCombustibleRepository.findAll().size();

        // Delete the tipoCombustible
        restTipoCombustibleMockMvc.perform(delete("/api/tipo-combustibles/{id}", tipoCombustible.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoCombustible> tipoCombustibleList = tipoCombustibleRepository.findAll();
        assertThat(tipoCombustibleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
