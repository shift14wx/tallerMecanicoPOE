package com.mecanica.org.web.rest;

import com.mecanica.org.TallerMecanicoPoeApp;
import com.mecanica.org.domain.Averia;
import com.mecanica.org.repository.AveriaRepository;

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
 * Integration tests for the {@link AveriaResource} REST controller.
 */
@SpringBootTest(classes = TallerMecanicoPoeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AveriaResourceIT {

    private static final LocalDate DEFAULT_FECHA_AVERIA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_AVERIA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PAGADO = false;
    private static final Boolean UPDATED_PAGADO = true;

    @Autowired
    private AveriaRepository averiaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAveriaMockMvc;

    private Averia averia;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Averia createEntity(EntityManager em) {
        Averia averia = new Averia()
            .fechaAveria(DEFAULT_FECHA_AVERIA)
            .descripcion(DEFAULT_DESCRIPCION)
            .pagado(DEFAULT_PAGADO);
        return averia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Averia createUpdatedEntity(EntityManager em) {
        Averia averia = new Averia()
            .fechaAveria(UPDATED_FECHA_AVERIA)
            .descripcion(UPDATED_DESCRIPCION)
            .pagado(UPDATED_PAGADO);
        return averia;
    }

    @BeforeEach
    public void initTest() {
        averia = createEntity(em);
    }

    @Test
    @Transactional
    public void createAveria() throws Exception {
        int databaseSizeBeforeCreate = averiaRepository.findAll().size();
        // Create the Averia
        restAveriaMockMvc.perform(post("/api/averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(averia)))
            .andExpect(status().isCreated());

        // Validate the Averia in the database
        List<Averia> averiaList = averiaRepository.findAll();
        assertThat(averiaList).hasSize(databaseSizeBeforeCreate + 1);
        Averia testAveria = averiaList.get(averiaList.size() - 1);
        assertThat(testAveria.getFechaAveria()).isEqualTo(DEFAULT_FECHA_AVERIA);
        assertThat(testAveria.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testAveria.isPagado()).isEqualTo(DEFAULT_PAGADO);
    }

    @Test
    @Transactional
    public void createAveriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = averiaRepository.findAll().size();

        // Create the Averia with an existing ID
        averia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAveriaMockMvc.perform(post("/api/averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(averia)))
            .andExpect(status().isBadRequest());

        // Validate the Averia in the database
        List<Averia> averiaList = averiaRepository.findAll();
        assertThat(averiaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAverias() throws Exception {
        // Initialize the database
        averiaRepository.saveAndFlush(averia);

        // Get all the averiaList
        restAveriaMockMvc.perform(get("/api/averias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(averia.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaAveria").value(hasItem(DEFAULT_FECHA_AVERIA.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].pagado").value(hasItem(DEFAULT_PAGADO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getAveria() throws Exception {
        // Initialize the database
        averiaRepository.saveAndFlush(averia);

        // Get the averia
        restAveriaMockMvc.perform(get("/api/averias/{id}", averia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(averia.getId().intValue()))
            .andExpect(jsonPath("$.fechaAveria").value(DEFAULT_FECHA_AVERIA.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.pagado").value(DEFAULT_PAGADO.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAveria() throws Exception {
        // Get the averia
        restAveriaMockMvc.perform(get("/api/averias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAveria() throws Exception {
        // Initialize the database
        averiaRepository.saveAndFlush(averia);

        int databaseSizeBeforeUpdate = averiaRepository.findAll().size();

        // Update the averia
        Averia updatedAveria = averiaRepository.findById(averia.getId()).get();
        // Disconnect from session so that the updates on updatedAveria are not directly saved in db
        em.detach(updatedAveria);
        updatedAveria
            .fechaAveria(UPDATED_FECHA_AVERIA)
            .descripcion(UPDATED_DESCRIPCION)
            .pagado(UPDATED_PAGADO);

        restAveriaMockMvc.perform(put("/api/averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAveria)))
            .andExpect(status().isOk());

        // Validate the Averia in the database
        List<Averia> averiaList = averiaRepository.findAll();
        assertThat(averiaList).hasSize(databaseSizeBeforeUpdate);
        Averia testAveria = averiaList.get(averiaList.size() - 1);
        assertThat(testAveria.getFechaAveria()).isEqualTo(UPDATED_FECHA_AVERIA);
        assertThat(testAveria.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testAveria.isPagado()).isEqualTo(UPDATED_PAGADO);
    }

    @Test
    @Transactional
    public void updateNonExistingAveria() throws Exception {
        int databaseSizeBeforeUpdate = averiaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAveriaMockMvc.perform(put("/api/averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(averia)))
            .andExpect(status().isBadRequest());

        // Validate the Averia in the database
        List<Averia> averiaList = averiaRepository.findAll();
        assertThat(averiaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAveria() throws Exception {
        // Initialize the database
        averiaRepository.saveAndFlush(averia);

        int databaseSizeBeforeDelete = averiaRepository.findAll().size();

        // Delete the averia
        restAveriaMockMvc.perform(delete("/api/averias/{id}", averia.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Averia> averiaList = averiaRepository.findAll();
        assertThat(averiaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
