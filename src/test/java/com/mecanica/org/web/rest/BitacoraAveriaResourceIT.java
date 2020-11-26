package com.mecanica.org.web.rest;

import com.mecanica.org.TallerMecanicoPoeApp;
import com.mecanica.org.domain.BitacoraAveria;
import com.mecanica.org.repository.BitacoraAveriaRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BitacoraAveriaResource} REST controller.
 */
@SpringBootTest(classes = TallerMecanicoPoeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BitacoraAveriaResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_BITACORA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_BITACORA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private BitacoraAveriaRepository bitacoraAveriaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBitacoraAveriaMockMvc;

    private BitacoraAveria bitacoraAveria;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BitacoraAveria createEntity(EntityManager em) {
        BitacoraAveria bitacoraAveria = new BitacoraAveria()
            .descripcion(DEFAULT_DESCRIPCION)
            .fechaBitacora(DEFAULT_FECHA_BITACORA);
        return bitacoraAveria;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BitacoraAveria createUpdatedEntity(EntityManager em) {
        BitacoraAveria bitacoraAveria = new BitacoraAveria()
            .descripcion(UPDATED_DESCRIPCION)
            .fechaBitacora(UPDATED_FECHA_BITACORA);
        return bitacoraAveria;
    }

    @BeforeEach
    public void initTest() {
        bitacoraAveria = createEntity(em);
    }

    @Test
    @Transactional
    public void createBitacoraAveria() throws Exception {
        int databaseSizeBeforeCreate = bitacoraAveriaRepository.findAll().size();
        // Create the BitacoraAveria
        restBitacoraAveriaMockMvc.perform(post("/api/bitacora-averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bitacoraAveria)))
            .andExpect(status().isCreated());

        // Validate the BitacoraAveria in the database
        List<BitacoraAveria> bitacoraAveriaList = bitacoraAveriaRepository.findAll();
        assertThat(bitacoraAveriaList).hasSize(databaseSizeBeforeCreate + 1);
        BitacoraAveria testBitacoraAveria = bitacoraAveriaList.get(bitacoraAveriaList.size() - 1);
        assertThat(testBitacoraAveria.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testBitacoraAveria.getFechaBitacora()).isEqualTo(DEFAULT_FECHA_BITACORA);
    }

    @Test
    @Transactional
    public void createBitacoraAveriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bitacoraAveriaRepository.findAll().size();

        // Create the BitacoraAveria with an existing ID
        bitacoraAveria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBitacoraAveriaMockMvc.perform(post("/api/bitacora-averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bitacoraAveria)))
            .andExpect(status().isBadRequest());

        // Validate the BitacoraAveria in the database
        List<BitacoraAveria> bitacoraAveriaList = bitacoraAveriaRepository.findAll();
        assertThat(bitacoraAveriaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBitacoraAverias() throws Exception {
        // Initialize the database
        bitacoraAveriaRepository.saveAndFlush(bitacoraAveria);

        // Get all the bitacoraAveriaList
        restBitacoraAveriaMockMvc.perform(get("/api/bitacora-averias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bitacoraAveria.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].fechaBitacora").value(hasItem(DEFAULT_FECHA_BITACORA.toString())));
    }
    
    @Test
    @Transactional
    public void getBitacoraAveria() throws Exception {
        // Initialize the database
        bitacoraAveriaRepository.saveAndFlush(bitacoraAveria);

        // Get the bitacoraAveria
        restBitacoraAveriaMockMvc.perform(get("/api/bitacora-averias/{id}", bitacoraAveria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bitacoraAveria.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.fechaBitacora").value(DEFAULT_FECHA_BITACORA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBitacoraAveria() throws Exception {
        // Get the bitacoraAveria
        restBitacoraAveriaMockMvc.perform(get("/api/bitacora-averias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBitacoraAveria() throws Exception {
        // Initialize the database
        bitacoraAveriaRepository.saveAndFlush(bitacoraAveria);

        int databaseSizeBeforeUpdate = bitacoraAveriaRepository.findAll().size();

        // Update the bitacoraAveria
        BitacoraAveria updatedBitacoraAveria = bitacoraAveriaRepository.findById(bitacoraAveria.getId()).get();
        // Disconnect from session so that the updates on updatedBitacoraAveria are not directly saved in db
        em.detach(updatedBitacoraAveria);
        updatedBitacoraAveria
            .descripcion(UPDATED_DESCRIPCION)
            .fechaBitacora(UPDATED_FECHA_BITACORA);

        restBitacoraAveriaMockMvc.perform(put("/api/bitacora-averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBitacoraAveria)))
            .andExpect(status().isOk());

        // Validate the BitacoraAveria in the database
        List<BitacoraAveria> bitacoraAveriaList = bitacoraAveriaRepository.findAll();
        assertThat(bitacoraAveriaList).hasSize(databaseSizeBeforeUpdate);
        BitacoraAveria testBitacoraAveria = bitacoraAveriaList.get(bitacoraAveriaList.size() - 1);
        assertThat(testBitacoraAveria.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testBitacoraAveria.getFechaBitacora()).isEqualTo(UPDATED_FECHA_BITACORA);
    }

    @Test
    @Transactional
    public void updateNonExistingBitacoraAveria() throws Exception {
        int databaseSizeBeforeUpdate = bitacoraAveriaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBitacoraAveriaMockMvc.perform(put("/api/bitacora-averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bitacoraAveria)))
            .andExpect(status().isBadRequest());

        // Validate the BitacoraAveria in the database
        List<BitacoraAveria> bitacoraAveriaList = bitacoraAveriaRepository.findAll();
        assertThat(bitacoraAveriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBitacoraAveria() throws Exception {
        // Initialize the database
        bitacoraAveriaRepository.saveAndFlush(bitacoraAveria);

        int databaseSizeBeforeDelete = bitacoraAveriaRepository.findAll().size();

        // Delete the bitacoraAveria
        restBitacoraAveriaMockMvc.perform(delete("/api/bitacora-averias/{id}", bitacoraAveria.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BitacoraAveria> bitacoraAveriaList = bitacoraAveriaRepository.findAll();
        assertThat(bitacoraAveriaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
